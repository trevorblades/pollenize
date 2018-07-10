export default sequelize => {
  const Position = sequelize.define('position');
  Position.associate = models => {
    Position.belongsTo(models.Candidate);
    Position.belongsTo(models.Topic);
    Position.hasMany(models.Message);
    Position.hasMany(models.Source);
  };

  return Position;
};
