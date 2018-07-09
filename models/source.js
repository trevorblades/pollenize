export default (sequelize, DataTypes) => {
  const Source = sequelize.define('source', {
    url: DataTypes.STRING
  });

  Source.associate = models => {
    Source.belongsTo(models.Message);
  };

  return Source;
};
