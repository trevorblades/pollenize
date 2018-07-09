export default (sequelize, DataTypes) => {
  const Language = sequelize.define('language', {
    code: DataTypes.STRING
  });

  Language.associate = models => {
    Language.belongsToMany(models.Election, {through: models.ElectionLanguage});
  };

  return Language;
};
