import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Election {
    candidates: [Candidate]
  }

  type Candidate {
    id: ID
    slug: String
    name: String
    birthDate: String
    hometown: String
    portrait: String
    color: String
    active: Boolean
  }
`;

export const resolvers = {
  Election: {
    candidates(parent) {
      return parent.getCandidates({
        where: {
          active: true
        }
      });
    }
  }
};
