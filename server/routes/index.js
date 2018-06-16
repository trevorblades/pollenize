import express from 'express';
import elections from './elections';

const router = express.Router();
router.use('/elections', elections);

export default router;
