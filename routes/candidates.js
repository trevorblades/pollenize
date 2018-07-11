import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import uploadMiddleware from '../middleware/upload';
import {Candidate, Position, Message} from '../models';
import {candidate as candidateSchema} from '../schemas';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';
import {candidateOptions} from '../util';

const validationMiddleware = createValidationMiddleware(
  checkSchema(candidateSchema)
);

const router = express.Router();
router.use(jwtMiddleware);

router.post('/', uploadMiddleware, validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  if (!req.user.getDataValue('election_ids').includes(data.election_id)) {
    res.sendStatus(403);
    return;
  }

  if (req.file) {
    data.avatar = req.file.data.link;
  }

  const candidate = await Candidate.create(data, {
    include: ['parties', 'bios', Position]
  });
  res.send(candidate);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.candidate = await Candidate.findById(
      req.params.id,
      candidateOptions
    );

    if (!res.locals.candidate) {
      res.sendStatus(404);
      return;
    }

    if (
      !req.user
        .getDataValue('election_ids')
        .includes(res.locals.candidate.election_id)
    ) {
      res.sendStatus(403);
      return;
    }

    next();
  })
  .put(uploadMiddleware, validationMiddleware, async (req, res, next) => {
    const data = matchedData(req);
    if (req.file) {
      data.avatar = req.file.data.link;
    }

    const parties = await Message.bulkCreate(data.parties, {returning: true});
    await res.locals.candidate.setParties(parties);
    res.locals.candidate.setDataValue('parties', parties);
    delete data.parties;

    const bios = await Message.bulkCreate(data.bios, {returning: true});
    await res.locals.candidate.setBios(bios);
    res.locals.candidate.setDataValue('bios', bios);
    delete data.bios;

    const captions = await Message.bulkCreate(data.captions, {returning: true});
    await res.locals.candidate.setCaptions(captions);
    res.locals.candidate.setDataValue('captions', captions);
    delete data.captions;

    await res.locals.candidate.update(data);
    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.candidate.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.candidate));

export default router;
