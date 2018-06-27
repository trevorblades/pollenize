import express from 'express';
import createValidationMiddleware from '../middleware/validation';
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

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    title: required,
    slug: required,
    description: {
      exists: true,
      trim: true
    },
    election_id: {
      isInt: true
    }
  })
);

const router = express.Router();
router.post('/', uploadMiddleware, validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  if (req.file) {
    data.image = req.file.data.link;
  }

  const topic = await Topic.create(data);
  res.send(topic);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.topic = await Topic.findById(req.params.id);
    next();
  })
  .put(uploadMiddleware, validationMiddleware, async (req, res, next) => {
    const data = matchedData(req);
    if (req.file) {
      data.image = req.file.data.link;
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
