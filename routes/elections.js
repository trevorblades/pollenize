import express from 'express';
import shuffle from 'lodash/shuffle';
import {Election, Topic, Position, Source} from '../models';

const router = express.Router();
router.get('/', async (req, res) => {
  const elections = await Election.findAll();
  res.send(elections);
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
    include: {
      model: Position,
      include: Source
    }
  });

  election.setDataValue('candidates', shuffle(candidates));
  res.send(election);
});

export default router;
