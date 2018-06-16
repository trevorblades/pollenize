export default (sequelize, DataTypes) => {
  const Topic = sequelize.define('topic', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING
  });

  Topic.associate = models => {
    models.Topic.belongsTo(models.Election);
  };

  return Topic;
};
