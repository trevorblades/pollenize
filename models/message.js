export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: DataTypes.TEXT
  });

  Message.associate = models => {
    Message.belongsTo(models.Language);
  };

  return Message;
};
