import {createThroughAssociations} from '../util/helpers';

export default (sequelize, DataTypes) => {
  const Candidate = sequelize.define('candidate', {
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    hometown: DataTypes.STRING,
    color: DataTypes.STRING,
    avatar: DataTypes.STRING,
    video_url: DataTypes.STRING
  });

  Candidate.associate = models => {
    Candidate.belongsTo(models.Election);
    Candidate.hasMany(models.Position);

    createThroughAssociations(
      Candidate,
      models.Message,
      [models.CandidateParty, 'party'],
      [models.CandidateBio, 'bio'],
      [models.CandidateCaption, 'caption']
    );
  };

  return Candidate;
};
