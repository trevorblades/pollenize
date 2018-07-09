import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import filter from 'lodash/filter';
import jwtMiddleware from '../middleware/jwt';
import uploadMiddleware from '../middleware/upload';
import {Topic, Sequelize} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';
import {
  topic as topicSchema,
  reorderTopics as reorderTopicsSchema
} from '../schemas';

const validationMiddleware = createValidationMiddleware(
  checkSchema(topicSchema)
);

const router = express.Router();
router.use(jwtMiddleware);

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

const reorderValidationMiddleware = createValidationMiddleware(
  checkSchema(reorderTopicsSchema)
);

router.post('/reorder', reorderValidationMiddleware, async (req, res) => {
  const data = matchedData(req);
  const electionIds = req.user.getDataValue('election_ids');
  const updates = data.topics.map(async ({id, order}) => {
    const update = await Topic.update(
      {order},
      {
        where: {
          id,
          election_id: {
            [Sequelize.Op.in]: electionIds
          }
        },
        returning: true
      }
    );
    return update[1][0];
  });

  const topics = await Promise.all(updates);
  if (filter(topics).length !== data.topics.length) {
    res.sendStatus(403);
    return;
  }

  res.send(topics);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.topic = await Topic.findById(req.params.id);

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
    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.topic.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.topic));

export default router;
