import express from 'express';
import {Topic} from '../models';

const router = express.Router();
router.post('/', async (req, res) => {
  const topic = await Topic.create(req.body);
  res.send(topic);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.topic = await Topic.findById(req.params.id);
    next();
  })
  .put(async (req, res, next) => {
    await res.locals.topic.update(req.body);
    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.topic.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.topic));

export default router;
