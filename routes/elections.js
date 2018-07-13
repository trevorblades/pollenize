import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import shuffle from 'lodash/shuffle';
import {Election, Language, Topic, Sequelize, sequelize} from '../models';
import {CANDIDATE_OPTIONS} from '../constants';
import {checkSchema} from 'express-validator/check';
import {jwtFromRequest} from '../strategies/jwt';
import {matchedData} from 'express-validator/filter';
import {notEmptyString} from '../util/schema';

function optionalJwtMiddleware(req, res, next) {
  if (jwtFromRequest(req)) {
    jwtMiddleware(req, res, next);
    return;
  }
  next();
}

async function getOptions(user, where = {}) {
  if (user) {
    const electionIds = user.getDataValue('election_ids');
    if (electionIds.length) {
      return {
        where: {
          ...where,
          [Sequelize.Op.or]: {
            public: true,
            id: {
              [Sequelize.Op.in]: electionIds
            }
          }
        },
        attributes: {
          include: [
            [
              // sequelize.where(sequelize.col('id'), Sequelize.Op.in, `(${electionIds})`),
              sequelize.literal(`"election"."id" IN (${electionIds})`),
              'editable'
            ]
          ]
        }
      };
    }
  }

  return {
    where: {
      ...where,
      public: true
    },
    attributes: {
      include: [[sequelize.literal('false'), 'editable']]
    }
  };
}

const router = express.Router();
router.get('/', optionalJwtMiddleware, async (req, res) => {
  const options = await getOptions(req.user);
  const elections = await Election.findAll(options);
  res.send(elections);
});

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    slug: notEmptyString,
    title: notEmptyString,
    public: {
      isBoolean: true
    }
  })
);

router
  .route('/:id')
  .get(optionalJwtMiddleware, async (req, res) => {
    const options = await getOptions(req.user, {slug: req.params.id});
    const election = await Election.findOne({
      ...options,
      include: [Language, Topic],
      order: [[Topic, 'order', 'ASC']]
    });

    if (!election) {
      res.sendStatus(404);
      return;
    }

    const candidates = await election.getCandidates(CANDIDATE_OPTIONS);
    election.setDataValue('candidates', shuffle(candidates));
    res.send(election);
  })
  .put(jwtMiddleware, validationMiddleware, async (req, res) => {
    let election;
    const data = matchedData(req);
    const electionIds = req.user.getDataValue('election_ids');
    if (electionIds.length) {
      const update = await Election.update(data, {
        where: {
          [Sequelize.Op.and]: [
            {id: req.params.id},
            {
              id: {
                [Sequelize.Op.in]: electionIds
              }
            }
          ]
        },
        returning: true
      });

      election = update[1][0];
    }

    if (!election) {
      res.sendStatus(403);
      return;
    }

    res.send(election);
  });

export default router;
