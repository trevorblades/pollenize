export default (sequelize, DataTypes) => {
  const Source = sequelize.define('source', {
    url: DataTypes.STRING
  });

  Source.associate = models => {
    models.Source.belongsTo(models.Position);
  };

  return Source;
};
