import {validationResult} from 'express-validator/check';

export default function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({errors: errors.mapped()});
  }

  next();
}
