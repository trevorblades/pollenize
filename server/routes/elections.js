import express from 'express';
import groupBy from 'lodash/groupBy';
import invokeMap from 'lodash/invokeMap';
import {Election, Topic, Position, Source} from '../models';

const router = express.Router();
router.get('/', async (req, res) => {
  const skaters = await Election.findAll();
  res.send(skaters);
});

router.route('/:id').get(async (req, res) => {
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
      include: [Topic, Source]
    }
  });

  election.setDataValue(
    'candidates',
    candidates.map(candidate => {
      const positions = invokeMap(candidate.positions, 'toJSON');
      return {
        ...candidate.toJSON(),
        positions: groupBy(positions, 'topic.id')
      };
    })
  );

  res.send(election);
});

export default router;
