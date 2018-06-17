import express from 'express';
import {Position, Source} from '../models';

const router = express.Router();
router.post('/', async (req, res) => {
  const position = await Position.create(req.body, {include: Source});
  res.send(position);
});

export default router;
