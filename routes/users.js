import bcrypt from 'bcryptjs';
import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwt from 'jsonwebtoken';
import {Invitation, User} from '../models';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

const router = express.Router();
const validationMiddleware = createValidationMiddleware(
  checkSchema({
    password: {
      isLength: {
        options: {
          min: 4
        }
      }
    },
    password_confirm: {
      custom: {
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

  const user = await User.create({
    email: invitation.email,
    name: invitation.name,
    password: bcrypt.hashSync(data.password, 10),
    organization_id: invitation.organization_id
  });

  await invitation.destroy();
  res.send(user.toJWT());
});

export default router;
