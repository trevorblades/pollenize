import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwt from 'jsonwebtoken';
import jwtMiddleware from '../middleware/jwt';
import {Invitation, User} from '../models';
import {checkSchema} from 'express-validator/check';
import {isInt, notEmpty} from '../util/schema';
import {matchedData} from 'express-validator/filter';

const router = express.Router();
router.use(jwtMiddleware);

const validationMiddleware = createValidationMiddleware(
  checkSchema({
    email: {
      isEmail: true
    },
    name: notEmpty,
    organization_id: isInt
  })
);

router.post('/', validationMiddleware, async (req, res) => {
  // TODO: add this org checking to the jwt middleware
  if (req.user.organization_id !== 1) {
    res.sendStatus(403);
    return;
  }

  const data = matchedData(req);
  const user = await User.findOne({
    where: {
      email: data.email
    }
  });

  if (user) {
    res.sendStatus(400, 'Email already in use');
    return;
  }

  let invitation = await Invitation.findOne({where: data});
  if (!invitation) {
    invitation = await Invitation.create(data);
  }

  const organization = await invitation.getOrganization();
  const payload = {
    ...invitation.toJSON(),
    organization: organization.toJSON()
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  res.send(token);
});

export default router;
