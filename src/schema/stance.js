import {Stance, sequelize} from '../db';
import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Topic {
    stances: [Stance]
  }

  extend type Candidate {
    stances: [Stance]
  }

  type Stance {
    id: ID
    textEn: String
    textFr: String
    topicId: ID
  }
`;

export const resolvers = {
  Topic: {
    stances(parent) {
      return parent.getStances({
        attributes: [
          // hack to return one stance per candidate
          // see https://github.com/sequelize/sequelize/issues/5475#issuecomment-343691692
          // TODO: make this consistent with the first stance chosen in the candidate pages
          sequelize.literal('distinct on("candidateId") 1'),
          ...Object.keys(Stance.rawAttributes)
        ]
      });
    }
  },
  Candidate: {
    stances(parent) {
      return parent.getStances();
    }
  }
};
