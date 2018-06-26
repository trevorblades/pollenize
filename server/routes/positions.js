import express from 'express';
import createValidationMiddleware from '../middleware/validation';
import {Position, Source} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

const isInt = {isInt: true};
const validationMiddleware = createValidationMiddleware(
  checkSchema({
    text: {
      trim: true,
      isEmpty: {
        negated: true
      }
    },
    sources: {
      isArray: true
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
  const data = matchedData(req);
  const position = await Position.create(data, {include: Source});
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
  .put(validationMiddleware, async (req, res, next) => {
    const data = matchedData(req);
    res.locals.position.setDataValue('text', data.text);
    res.locals.position.changed('updated_at', true);
    await res.locals.position.save();

    const sources = await Source.bulkCreate(data.sources, {returning: true});
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
