export default (sequelize, DataTypes) => {
  const Election = sequelize.define('election', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
    ends_at: DataTypes.DATE
  });

  Election.associate = models => {
    Election.hasMany(models.Candidate);
    Election.hasMany(models.Topic);
    Election.belongsToMany(models.Language, {through: 'election_languages'});
  };

  return Election;
};
