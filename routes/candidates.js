import ImgurStorage from 'multer-storage-imgur';
import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import multer from 'multer';
import {Candidate, Position, Source} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

const required = {
  trim: true,
  isEmpty: {
    negated: true
  }
};

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    name: required,
    slug: required,
    party: required,
    color: {
      isHexColor: true
    },
    election_id: {
      isInt: true
    }
  })
);

const storage = ImgurStorage({clientId: process.env.IMGUR_CLIENT_ID});
const upload = multer({storage});
const uploadMiddleware = upload.single('file');

const router = express.Router();
router.post('/', uploadMiddleware, validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  if (req.file) {
    data.avatar = req.file.data.link;
  }

  const candidate = await Candidate.create(data, {include: Position});
  res.send(candidate);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.candidate = await Candidate.findById(req.params.id, {
      include: {
        model: Position,
        include: Source
      }
    });
    next();
  })
  .put(uploadMiddleware, validationMiddleware, async (req, res, next) => {
    const data = matchedData(req);
    if (req.file) {
      data.avatar = req.file.data.link;
    }

    await res.locals.candidate.update(data);
    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.candidate.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.candidate));

export default router;
