import express from 'express';
import {Election, Topic, Position, Source, sequelize} from '../models';

const router = express.Router();
router.get('/', async (req, res) => {
  const skaters = await Election.findAll();
  res.send(skaters);
});

router.get('/:id', async (req, res) => {
  const election = await Election.findOne({
    where: {
      slug: req.params.id
    },
    include: Topic,
    order: [[Topic, 'id', 'ASC']]
  });

  if (!election) {
    res.sendStatus(404);
    return;
  }

  const candidates = await election.getCandidates({
    order: [[sequelize.fn('RANDOM')]],
    include: {
      model: Position,
      include: Source
    }
  });

  election.setDataValue('candidates', candidates);
  res.send(election);
});

export default router;
