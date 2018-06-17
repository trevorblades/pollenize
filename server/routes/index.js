import express from 'express';
import elections from './elections';
import positions from './positions';

const router = express.Router();
router.use('/elections', elections);
router.use('/positions', positions);

export default router;
