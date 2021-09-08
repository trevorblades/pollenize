import Sequelize from 'sequelize';
import basicAuth from 'basic-auth';
import bcrypt from 'bcryptjs';
import {User} from './db.js';

const {Op} = Sequelize;

export default async function handleAuth(req, res) {
  const {name, pass} = basicAuth(req);
  const user = await User.findOne({
    where: {
      email: {
        [Op.iLike]: name
      },
      password: {
        [Op.not]: null
      }
    }
  });

  if (user) {
    const isValid = await bcrypt.compare(pass, user.password);
    if (isValid) {
      res.send(user.toJWT());
      return;
    }
  }

  res.sendStatus(401);
}
