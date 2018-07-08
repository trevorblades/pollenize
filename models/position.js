export default (sequelize, DataTypes) => {
  const Position = sequelize.define('position', {
    text: DataTypes.TEXT
  });

  Position.associate = models => {
    Position.belongsTo(models.Candidate);
    Position.belongsTo(models.Topic);
    Position.hasMany(models.Source);
  };

  return Position;
};
