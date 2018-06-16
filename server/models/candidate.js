export default (sequelize, DataTypes) => {
  const Candidate = sequelize.define('candidate', {
    slug: DataTypes.STRING,
    name: DataTypes.STRING
  });

  Candidate.associate = models => {
    models.Candidate.belongsTo(models.Election);
    models.Candidate.hasMany(models.Position);
  };

  return Candidate;
};
