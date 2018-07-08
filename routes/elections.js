import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import shuffle from 'lodash/shuffle';
import {Election, Topic, Position, Source} from '../models';
import {checkSchema} from 'express-validator/check';
import {jwtFromRequest} from '../strategies/jwt';
import {matchedData} from 'express-validator/filter';

function optionalJwtMiddleware(req, res, next) {
  if (jwtFromRequest(req)) {
    jwtMiddleware(req, res, next);
    return;
  }
  next();
}

function getWhere(user, where = {}) {
  return user ? where : {...where, public: true};
}

const router = express.Router();
router.get('/', optionalJwtMiddleware, async (req, res) => {
  const elections = await Election.findAll({
    where: getWhere(req.user)
  });
  res.send(elections);
});

const required = {
  trim: true,
  isEmpty: {
    negated: true
  }
};

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    slug: required,
    title: required,
    public: {
      isBoolean: true
    }
  })
);

router
  .route('/:id')
  .get(optionalJwtMiddleware, async (req, res) => {
    const election = await Election.findOne({
      where: getWhere(req.user, {
        slug: req.params.id
      }),
      include: Topic,
      order: [[Topic, 'order', 'ASC']]
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
  })
  .put(jwtMiddleware, validationMiddleware, async (req, res) => {
    const data = matchedData(req);
    const updates = await Election.update(data, {
      where: {
        id: req.params.id
      },
      returning: true
    });

    res.send(updates[1][0]);
  });

export default router;
