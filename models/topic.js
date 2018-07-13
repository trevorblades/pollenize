import {createThroughAssociations} from '../util/helpers';

export default (sequelize, DataTypes) => {
  const Topic = sequelize.define('topic', {
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    order: DataTypes.INTEGER
  });

  Topic.associate = models => {
    Topic.belongsTo(models.Election);
    Topic.hasMany(models.Position);

    createThroughAssociations(
      Topic,
      models.Message,
      [models.TopicTitle, 'title'],
      [models.TopicDescription, 'description']
    );
  };

  return Topic;
};
