import express from 'express';
import {Election, Topic, Candidate, Position, Source} from '../models';

const router = express.Router();
router.get('/', async (req, res) => {
  const skaters = await Election.findAll();
  res.send(skaters);
});

router.get('/:id', async (req, res) => {
  const election = await Election.findById(req.params.id, {
    include: [
      Topic,
      {
        model: Candidate,
        include: {
          model: Position,
          include: Source
        }
      }
    ]
  });

  res.send(election);
});

export default router;
