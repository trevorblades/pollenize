import createValidationMiddleware from '../../middleware/validation';
import express from 'express';
import jwtMiddleware from '../../middleware/jwt';
import reorder from './reorder';
import uploadMiddleware from '../../middleware/upload';
import {Source, Topic} from '../../models';
import {bulkCreateAndSet} from '../../util/helpers';
import {checkSchema} from 'express-validator/check';
import {getMessageSchema, setMessages} from '../../util/messages';
import {isInt, isUrl, notEmptyString, stringToArray} from '../../util/schema';
import {matchedData} from 'express-validator/filter';

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    ...getMessageSchema('titles', true, true),
    ...getMessageSchema('descriptions', false, true),
    slug: notEmptyString,
    sources: stringToArray,
    'sources.*.url': isUrl,
    election_id: isInt,
    file: {
      optional: true,
      equals: {
        options: 'null'
      }
    }
  })
);

const router = express.Router();
router.use(jwtMiddleware);
router.use('/reorder', reorder);

router.post('/', uploadMiddleware, validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  if (!req.user.getDataValue('election_ids').includes(data.election_id)) {
    res.sendStatus(403);
    return;
  }

  if (req.file) {
    data.image = req.file.data.link;
  }

  const topic = await Topic.create(data, {
    include: ['titles', 'descriptions', Source]
  });
  res.send(topic);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.topic = await Topic.findById(req.params.id, {
      include: ['titles', 'descriptions', Source]
    });

    if (!res.locals.topic) {
      res.sendStatus(404);
      return;
    }

    if (
      !req.user
        .getDataValue('election_ids')
        .includes(res.locals.topic.election_id)
    ) {
      res.sendStatus(403);
      return;
    }

    next();
  })
  .put(uploadMiddleware, validationMiddleware, async (req, res, next) => {
    const data = matchedData(req);
    const file = req.file ? req.file.data.link : req.body.file;
    if (file) {
      data.image = file === 'null' ? null : file;
    }

    await res.locals.topic.update(data);

    await Promise.all([
      setMessages(res.locals.topic, data, ['titles', 'descriptions']),
      bulkCreateAndSet(res.locals.topic, data.sources, Source)
    ]);

    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.topic.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.topic));

export default router;
