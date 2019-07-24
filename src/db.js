import Sequelize from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL);

export const Election = sequelize.define('election', {
  slug: Sequelize.STRING,
  title: Sequelize.STRING,
  flag: Sequelize.STRING,
  public: Sequelize.BOOLEAN,
  partyFirst: Sequelize.BOOLEAN,
  endsAt: Sequelize.DATE
});

const Candidate = sequelize.define('candidate', {
  slug: Sequelize.STRING,
  name: Sequelize.STRING,
  birthDate: Sequelize.DATE,
  hometown: Sequelize.STRING,
  portrait: Sequelize.STRING,
  color: Sequelize.STRING,
  active: Sequelize.BOOLEAN
});

Candidate.belongsTo(Election);
Election.hasMany(Candidate);

export const User = sequelize.define('user', {
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING
});
