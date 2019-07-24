import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

export const sequelize = new Sequelize(process.env.DATABASE_URL);

export const Election = sequelize.define('election', {
  slug: Sequelize.STRING,
  title: Sequelize.STRING,
  flag: Sequelize.STRING,
  public: Sequelize.BOOLEAN,
  partyFirst: Sequelize.BOOLEAN,
  endsAt: Sequelize.DATE
});

export const User = sequelize.define('user', {
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING
});

User.prototype.toJWT = function(expiresIn = '7 days') {
  const {id, email, name} = this.get();
  return jwt.sign({email, name}, process.env.TOKEN_SECRET, {
    expiresIn,
    subject: id.toString()
  });
};
