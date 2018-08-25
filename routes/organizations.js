import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import {Organization} from '../models';

const router = express.Router();
router.use(jwtMiddleware);

router.get('/', async (req, res) => {
  // TODO: add this org checking to the jwt middleware
  if (req.user.organization_id !== 1) {
    res.sendStatus(403);
    return;
  }

  const organizations = await Organization.findAll();
  res.send(organizations);
});

export default router;
