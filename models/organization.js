export default (sequelize, DataTypes) => {
  const Organization = sequelize.define('organization', {
    name: DataTypes.STRING
  });

  Organization.associate = models => {
    Organization.hasMany(models.User);
    Organization.belongsToMany(models.Election, {
      through: 'organization_elections'
    });
  };

  return Organization;
};
