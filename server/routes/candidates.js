import express from 'express';
import {Candidate} from '../models';

const router = express.Router();
router.post('/', async (req, res) => {
  const candidate = await Candidate.create(req.body);
  res.send(candidate);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.candidate = await Candidate.findById(req.params.id);
    next();
  })
  .put(async (req, res, next) => {
    await res.locals.candidate.update(req.body);
    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.candidate.destroy();
    next();
  })
  .all((req, res) => {
    res.send(res.locals.candidate);
  });

export default router;
