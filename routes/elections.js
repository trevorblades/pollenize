import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import shuffle from 'lodash/shuffle';
import {CANDIDATE_OPTIONS} from '../constants';
import {
  Election,
  Language,
  Organization,
  Sequelize,
  Topic,
  sequelize
} from '../models';
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

function getOptions(user) {
  if (user) {
    const electionIds = user.getDataValue('election_ids');
    if (electionIds.length) {
      return {
        where: {
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
              sequelize.literal(`"election"."id" IN (${electionIds})`),
              'editable'
            ]
          ]
        }
      };
    }
  }

  return {
    where: {public: true},
    attributes: {
      include: [[sequelize.literal('false'), 'editable']]
    }
  };
}

const router = express.Router();
router.get('/', optionalJwtMiddleware, async (req, res) => {
  const options = getOptions(req.user);
  const elections = await Election.findAll({
    ...options,
    order: [['ends_at', 'DESC']]
  });
  res.send(elections);
});

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    public: {
      isBoolean: true
    }
  })
);

router
  .route('/:id')
  .get(optionalJwtMiddleware, async (req, res) => {
    const {attributes} = getOptions(req.user);
    const election = await Election.findOne({
      attributes,
      where: {
        slug: req.params.id
      },
      include: [
        Language,
        'default_language',
        Organization,
        {
          model: Topic,
          include: ['titles', 'descriptions']
        }
      ],
      order: [[Topic, 'order']]
    });

    if (!election) {
      res.sendStatus(404);
      return;
    }

    const partners = await election.getOrganizations({
      where: {
        id: {
          [Sequelize.Op.ne]: 1
        }
      }
    });
    election.setDataValue('partners', partners);

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
