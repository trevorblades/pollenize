import groupBy from 'lodash/groupBy';

export default (sequelize, DataTypes) => {
  const Candidate = sequelize.define('candidate', {
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    party: DataTypes.STRING,
    color: DataTypes.STRING,
    avatar: DataTypes.STRING
  });

  Candidate.associate = models => {
    models.Candidate.belongsTo(models.Election);
    models.Candidate.hasMany(models.Position);
  };

  Candidate.prototype.toJSON = function() {
    const candidate = this.get();
    return {
      ...candidate,
      positions: groupBy(candidate.positions, 'topic_id')
    };
  };

  return Candidate;
};
