import createValidationMiddleware from '../../middleware/validation';
import express from 'express';
import jwtMiddleware from '../../middleware/jwt';
import uploadMiddleware from '../../middleware/upload';
import reorder from './reorder';
import {Topic} from '../../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';
import {notEmptyString, isInt} from '../../util/schema';
import {setMessages, getMessageSchema} from '../../util/messages';

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    ...getMessageSchema('titles', true, true),
    ...getMessageSchema('descriptions', false, true),
    slug: notEmptyString,
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

  const topic = await Topic.create(data);
  res.send(topic);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.topic = await Topic.findById(req.params.id, {
      include: ['titles', 'descriptions']
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
    await setMessages(res.locals.topic, data, ['titles', 'descriptions']);

    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.topic.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.topic));

export default router;
