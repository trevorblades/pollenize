import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import uploadMiddleware from '../middleware/upload';
import {Topic} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

const required = {
  trim: true,
  isEmpty: {
    negated: true
  }
};

const isInt = {
  isInt: true,
  toInt: true
};

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    title: required,
    slug: required,
    description: {
      exists: true,
      trim: true
    },
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

router.post('/', uploadMiddleware, validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  if (req.file) {
    data.image = req.file.data.link;
  }

  const topic = await Topic.create(data);
  res.send(topic);
});

const reorderValidationMiddleware = createValidationMiddleware(
  checkSchema({
    topics: {
      isArray: true
    },
    'topics.*.id': isInt,
    'topics.*.order': isInt
  })
);

router.post('/reorder', reorderValidationMiddleware, async (req, res) => {
  const updates = req.body.topics.map(async ({id, order}) => {
    const update = await Topic.update(
      {order},
      {
        where: {id},
        returning: true
      }
    );
    return update[1][0];
  });

  const topics = await Promise.all(updates);
  res.send(topics);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.topic = await Topic.findById(req.params.id);
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
