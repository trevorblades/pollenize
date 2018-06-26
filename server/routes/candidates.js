import express from 'express';
import handleValidation from '../middleware/handle-validation';
import {Candidate} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

const required = {
  trim: true,
  isEmpty: {
    negated: true
  }
};

const schema = {
  name: required,
  slug: required,
  party: required,
  color: {
    isHexColor: true
  },
  election_id: {
    isInt: true
  }
};

const validate = [checkSchema(schema), handleValidation];

const router = express.Router();
router.post('/', validate, async (req, res) => {
  const data = matchedData(req);
  const candidate = await Candidate.create(data);
  res.send(candidate);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.candidate = await Candidate.findById(req.params.id);
    next();
  })
  .put(validate, async (req, res, next) => {
    await res.locals.candidate.update(req.body);
    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.candidate.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.candidate));

export default router;
