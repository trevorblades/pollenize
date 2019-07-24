import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = models => {
    User.belongsTo(models.Organization);
  };

  User.prototype.toJWT = function(expiresIn = '7 days') {
    const {id, email, name} = this.get();
    return jwt.sign({email, name}, process.env.TOKEN_SECRET, {
      expiresIn,
      subject: id.toString()
    });
  };

  return User;
};
