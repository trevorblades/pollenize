export default (sequelize, DataTypes) => {
  const Invitation = sequelize.define('invitation', {
    email: DataTypes.STRING,
    name: DataTypes.STRING
  });

  Invitation.associate = models => {
    Invitation.belongsTo(models.Organization);
  };

  return Invitation;
};
