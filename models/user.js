export default (sequelize, DataTypes) =>
  sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });
