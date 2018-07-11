export default (sequelize, DataTypes) =>
  sequelize.define('language', {
    code: DataTypes.STRING
  });
