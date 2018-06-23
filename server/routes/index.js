import express from 'express';
import elections from './elections';
import positions from './positions';
import topics from './topics';

const router = express.Router();
router.use('/elections', elections);
router.use('/positions', positions);
router.use('/topics', topics);

export default router;
