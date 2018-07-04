import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.prototype.toJWT = function(expiresIn = '7 days') {
    return jwt.sign(this.get(), process.env.TOKEN_SECRET, {expiresIn});
  };

  return User;
};
