import auth from './auth';
import express from 'express';
import candidates from './candidates';
import elections from './elections';
import invitations from './invitations';
import organizations from './organizations';
import positions from './positions';
import topics from './topics';
import users from './users';

const router = express.Router();
router.get('/', (req, res) => res.sendStatus(200));

router.use('/auth', auth);
router.use('/candidates', candidates);
router.use('/elections', elections);
router.use('/invitations', invitations);
router.use('/organizations', organizations);
router.use('/positions', positions);
router.use('/topics', topics);
router.use('/users', users);

export default router;
