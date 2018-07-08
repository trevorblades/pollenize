export default (sequelize, DataTypes) => {
  const Organization = sequelize.define('organization', {
    name: DataTypes.STRING
  });

  Organization.associate = models => {
    Organization.hasMany(models.User);
  };

  return Organization;
};
