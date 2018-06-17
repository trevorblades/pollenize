import express from 'express';
import {Position, Source} from '../models';

const router = express.Router();
router.post('/', async (req, res) => {
  const position = await Position.create(req.body, {include: Source});
  res.send(position);
});

router.put('/:id', async (req, res) => {
  const position = await Position.findById(req.params.id);
  await position.update({text: req.body.text});

  const sources = await Source.bulkCreate(req.body.sources, {returning: true});
  await position.setSources(sources);
  position.setDataValue('sources', sources);

  res.send(position);
});

export default router;
