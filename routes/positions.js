import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import {Candidate, Position, Source, Message} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';
import {position as positionSchema} from '../schemas';

const validationMiddleware = createValidationMiddleware(
  checkSchema(positionSchema)
);

const router = express.Router();
router.use(jwtMiddleware);

router.post('/', validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  const candidate = await Candidate.findById(data.candidate_id, {
    attributes: ['election_id']
  });

  if (
    !candidate ||
    !req.user.getDataValue('election_ids').includes(candidate.election_id)
  ) {
    res.sendStatus(403);
    return;
  }

  const position = await Position.create(data, {include: [Message, Source]});
  res.send(position);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.position = await Position.findById(req.params.id, {
      include: [Message, Source]
    });

    if (!res.locals.position) {
      res.sendStatus(404);
      return;
    }

    const candidate = await res.locals.position.getCandidate({
      attributes: ['election_id']
    });

    if (
      !candidate ||
      !req.user.getDataValue('election_ids').includes(candidate.election_id)
    ) {
      res.sendStatus(403);
      return;
    }

    next();
  })
  .put(validationMiddleware, async (req, res, next) => {
    const data = matchedData(req);
    res.locals.position.changed('updated_at', true);
    await res.locals.position.save();

    const messages = await Message.bulkCreate(data.messages, {returning: true});
    await res.locals.position.setMessages(messages);
    res.locals.position.setDataValue('messages', messages);

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
