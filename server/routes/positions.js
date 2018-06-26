import express from 'express';
import createValidationMiddleware from '../middleware/validation';
import {Position, Source} from '../models';
import {checkSchema} from 'express-validator/check';

const isInt = {isInt: true};
const validationMiddleware = createValidationMiddleware(
  checkSchema({
    text: {
      trim: true,
      isEmpty: {
        negated: true
      }
    },
    'sources.*.url': {
      isURL: true
    },
    candidate_id: isInt,
    topic_id: isInt
  })
);

const router = express.Router();
router.post('/', validationMiddleware, async (req, res) => {
  const position = await Position.create(req.body, {include: Source});
  res.send(position);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.position = await Position.findById(req.params.id, {
      include: Source
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
