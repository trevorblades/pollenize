export default sequelize => {
  const Position = sequelize.define('position');

  Position.associate = models => {
    Position.belongsTo(models.Candidate);
    Position.belongsTo(models.Topic);
    Position.hasMany(models.Source);
    Position.belongsToMany(models.Message, {through: models.PositionMessage});
  };

  return Position;
};
