import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import map from 'lodash/map';
import shuffle from 'lodash/shuffle';
import {
  Election,
  Topic,
  Position,
  Source,
  Sequelize,
  sequelize
} from '../models';
import {checkSchema} from 'express-validator/check';
import {election as electionSchema} from '../schemas';
import {jwtFromRequest} from '../strategies/jwt';
import {matchedData} from 'express-validator/filter';

function optionalJwtMiddleware(req, res, next) {
  if (jwtFromRequest(req)) {
    jwtMiddleware(req, res, next);
    return;
  }
  next();
}

async function getOptions(user, where = {}) {
  if (!user || !user.organization.elections.length) {
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

  const ids = map(user.organization.elections, 'id');
  return {
    where: {
      ...where,
      [Sequelize.Op.or]: {
        public: true,
        id: {
          [Sequelize.Op.in]: ids
        }
      }
    },
    attributes: {
      include: [
        [
          // sequelize.where(sequelize.col('id'), Sequelize.Op.in, `(${ids})`),
          sequelize.literal(`"election"."id" IN (${ids})`),
          'editable'
        ]
      ]
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
  checkSchema(electionSchema)
);

router
  .route('/:id')
  .get(optionalJwtMiddleware, async (req, res) => {
    const options = await getOptions(req.user, {slug: req.params.id});
    const election = await Election.findOne({
      ...options,
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
    let election;
    const data = matchedData(req);
    const {elections} = req.user.organization;
    if (elections.length) {
      const ids = map(elections, 'id');
      const update = await Election.update(data, {
        where: {
          [Sequelize.Op.and]: [
            {id: req.params.id},
            {
              id: {
                [Sequelize.Op.in]: ids
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
