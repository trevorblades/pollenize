import auth from './auth';
import express from 'express';
import candidates from './candidates';
import elections from './elections';
import positions from './positions';
import topics from './topics';

const router = express.Router();
router.get('/', (req, res) => res.sendStatus(200));
router.use('/auth', auth);
router.use('/candidates', candidates);
router.use('/elections', elections);
router.use('/positions', positions);
router.use('/topics', topics);

export default router;
