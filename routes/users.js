import bcrypt from 'bcryptjs';
import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwt from 'jsonwebtoken';
import {Invitation, User} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

const router = express.Router();

const min = 4;
const validationMiddleware = createValidationMiddleware(
  checkSchema({
    password: {
      isLength: {
        errorMessage: `Must be at least ${min} characters long`,
        options: {min}
      }
    },
    password_confirm: {
      custom: {
        errorMessage: "Passwords don't match",
        options: (value, {req}) => value === req.body.password
      }
    },
    token: {
      isJWT: true
    }
  })
);

router.post('/', validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  const decoded = jwt.verify(data.token, process.env.TOKEN_SECRET);
  const invitation = await Invitation.findById(decoded.id);
  if (!invitation) {
    res.sendStatus(400, 'Invalid invitation');
    return;
  }

  const {email, name, organization_id} = invitation;
  const user = await User.create({
    email,
    name,
    organization_id,
    password: bcrypt.hashSync(data.password, 10)
  });

  await Invitation.destroy({where: {email}});
  res.send(user.toJWT());
});

export default router;
