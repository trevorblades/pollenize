import basicAuth from 'basic-auth';
import bcrypt from 'bcryptjs';
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
      res.send(user.toJWT());
      return;
    }
  }

  res.sendStatus(401);
}
