import createValidationMiddleware from '../../middleware/validation';
import express from 'express';
import filter from 'lodash/filter';
import {Topic, Sequelize} from '../../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';
import {isInt, isArray} from '../../util/schema';

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    topics: isArray,
    'topics.*.id': isInt,
    'topics.*.order': isInt
  })
);

const router = express.Router();
router.post('/', validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  const electionIds = req.user.getDataValue('election_ids');
  const updates = data.topics.map(async ({id, order}) => {
    const topic = await Topic.findById(id, {
      include: ['titles', 'descriptions'],
      where: {
        election_id: {
          [Sequelize.Op.in]: electionIds
        }
      }
    });

    return await topic.update({order});
  });

  const topics = await Promise.all(updates);
  if (filter(topics).length !== data.topics.length) {
    res.sendStatus(403);
    return;
  }

  res.send(topics);
});

export default router;
