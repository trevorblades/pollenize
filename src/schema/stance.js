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

function stances(parent) {
  return parent.getStances();
}

export const resolvers = {
  Topic: {
    stances
  },
  Candidate: {
    stances
  }
};
