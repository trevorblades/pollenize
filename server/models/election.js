export default (sequelize, DataTypes) => {
  const Election = sequelize.define('election', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING
  });

  Election.associate = models => {
    models.Election.hasMany(models.Candidate);
  };

  return Election;
};
