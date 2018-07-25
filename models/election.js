export default (sequelize, DataTypes) => {
  const Election = sequelize.define('election', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    flag: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
    ends_at: DataTypes.DATE
  });

  Election.associate = models => {
    Election.hasMany(models.Candidate);
    Election.hasMany(models.Topic);
    Election.belongsTo(models.Language, {as: 'default_language'});
    Election.belongsToMany(models.Language, {through: models.ElectionLanguage});
    Election.belongsToMany(models.Organization, {
      through: models.OrganizationElection
    });
  };

  return Election;
};
