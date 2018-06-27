export default (sequelize, DataTypes) => {
  const Position = sequelize.define('position', {
    text: DataTypes.TEXT
  });

  Position.associate = models => {
    models.Position.belongsTo(models.Candidate);
    models.Position.belongsTo(models.Topic);
    models.Position.hasMany(models.Source);
  };

  return Position;
};
