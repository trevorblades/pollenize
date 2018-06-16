export default (sequelize, DataTypes) => {
  const Position = sequelize.define('position', {
    text: DataTypes.STRING
  });

  Position.associate = models => {
    models.Position.belongsTo(models.Candidate);
    models.Position.hasMany(models.Source);
  };

  return Position;
};
