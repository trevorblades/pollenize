import basicAuth from 'basic-auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Op} from 'sequelize';
import {User} from './db';

export default async function handleAuth(req, res) {
  const {name, pass} = basicAuth(req);
  const user = await User.findOne({
    where: {
      email: {
        [Op.iLike]: name
      }
    }
  });

  if (user) {
    const isValid = await bcrypt.compare(pass, user.password);
    if (isValid) {
      const {id, email, name} = user.get();
      const token = jwt.sign({email, name}, process.env.TOKEN_SECRET, {
        expiresIn: '7 days',
        subject: id.toString()
      });

      res.send(token);
      return;
    }
  }

  res.sendStatus(401);
}
