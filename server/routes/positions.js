import express from 'express';
import {Position, Source, Topic} from '../models';

const router = express.Router();
router.post('/', async (req, res) => {
  const position = await Position.create(req.body, {include: Source});
  res.send(position);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.position = await Position.findById(req.params.id, {
      include: [Source, Topic]
    });
    next();
  })
  .put(async (req, res, next) => {
    res.locals.position.changed('updated_at', true);
    res.locals.position.setDataValue('text', req.body.text);
    await res.locals.position.save();

    const sources = await Source.bulkCreate(req.body.sources, {
      returning: true
    });
    await res.locals.position.setSources(sources);
    res.locals.position.setDataValue('sources', sources);

    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.position.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.position));

export default router;
