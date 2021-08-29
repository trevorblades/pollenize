import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

export const sequelize = new Sequelize(process.env.DATABASE_URL);

export const Language = sequelize.define('language', {
  code: Sequelize.STRING,
  name: Sequelize.STRING
});

export const Message = sequelize.define('message', {
  text: Sequelize.TEXT
});

Message.belongsTo(Language);
Language.hasMany(Message);

export const Election = sequelize.define('election', {
  slug: Sequelize.STRING,
  title: Sequelize.STRING,
  flag: Sequelize.STRING,
  partyFirst: Sequelize.BOOLEAN,
  public: Sequelize.BOOLEAN,
  endsAt: Sequelize.DATE
});

Election.belongsTo(Language);

Election.belongsToMany(Message, {
  through: 'electionIntros',
  as: 'Intros'
});

Election.belongsToMany(Language, {
  through: 'electionLanguages',
  as: 'Languages'
});

export const Candidate = sequelize.define('candidate', {
  slug: Sequelize.STRING,
  name: Sequelize.STRING,
  birthDate: Sequelize.DATE,
  hometown: Sequelize.STRING,
  portrait: Sequelize.STRING,
  color: Sequelize.STRING,
  active: Sequelize.BOOLEAN
});

Candidate.belongsToMany(Message, {
  through: 'candidateParties',
  as: 'Parties'
});

Candidate.belongsToMany(Message, {
  through: 'candidateBios',
  as: 'Bios'
});

Candidate.belongsTo(Election);
Election.hasMany(Candidate);

export const User = sequelize.define('user', {
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING
});

User.prototype.toJWT = function (expiresIn = '7 days') {
  const {id, email, name} = this.get();
  return jwt.sign({email, name}, process.env.TOKEN_SECRET, {
    expiresIn,
    subject: id.toString()
  });
};

export const Topic = sequelize.define('topic', {
  slug: Sequelize.STRING,
  image: Sequelize.STRING,
  order: Sequelize.INTEGER
});

Topic.belongsToMany(Message, {
  through: 'topicTitles',
  as: 'Titles'
});

Topic.belongsToMany(Message, {
  through: 'topicDescriptions',
  as: 'Descriptions'
});

Topic.belongsTo(Election);
Election.hasMany(Topic);

export const Stance = sequelize.define('stance');

Stance.belongsToMany(Message, {through: 'stanceMessages'});

Stance.belongsTo(Candidate);
Candidate.hasMany(Stance);

Stance.belongsTo(Topic);
Topic.hasMany(Stance);

export const Source = sequelize.define('source', {
  url: Sequelize.STRING
});

Source.belongsTo(Stance);
Stance.hasMany(Source);

const Credit = sequelize.define('credit', {
  name: Sequelize.STRING,
  role: Sequelize.STRING
});

Credit.belongsTo(Election);
Election.hasMany(Credit);

export const Keyword = sequelize.define('keyword');

Keyword.belongsTo(Election);
Election.hasMany(Keyword);

Keyword.belongsToMany(Message, {
  through: 'keywordWords',
  as: 'words'
});

Keyword.belongsToMany(Message, {
  through: 'keywordDefinitions',
  as: 'definitions'
});
