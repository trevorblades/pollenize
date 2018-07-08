export default (sequelize, DataTypes) => {
  const Election = sequelize.define('election', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
    ends_at: DataTypes.DATE
  });

  Election.associate = models => {
    models.Election.hasMany(models.Candidate);
    models.Election.hasMany(models.Topic);
  };

  return Election;
};
