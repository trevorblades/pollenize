import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import uploadMiddleware from '../middleware/upload';
import youtubeRegex from 'youtube-regex';
import {CANDIDATE_OPTIONS} from '../constants';
import {Candidate, Position} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';
import {
  notEmptyString,
  exists,
  isInt,
  stringToArray,
  stringToNotEmptyArray
} from '../util/schema';
import {setMessages} from '../util/helpers';

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    slug: notEmptyString,
    name: notEmptyString,
    birth_date: {
      isISO8601: true
    },
    hometown: exists,
    parties: stringToNotEmptyArray,
    'parties.*.text': notEmptyString,
    'parties.*.language_id': isInt,
    bios: stringToNotEmptyArray,
    'bios.*.text': notEmptyString,
    'bios.*.language_id': isInt,
    color: {
      isHexColor: true
    },
    video_url: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      custom: {
        options: value => youtubeRegex().test(value)
      }
    },
    captions: stringToArray,
    'captions.*.text': notEmptyString,
    'captions.*.language_id': isInt,
    election_id: isInt
  })
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
      CANDIDATE_OPTIONS
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

    await res.locals.candidate.set(data);
    const keys = ['parties', 'bios', 'captions'];
    await setMessages(res.locals.candidate, data, keys);

    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.candidate.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.candidate));

export default router;
