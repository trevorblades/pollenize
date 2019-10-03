import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Election {
    languages: [Language]
  }

  type Language {
    id: ID
    code: String
    name: String
  }
`;

export const resolvers = {
  Election: {
    languages(parent) {
      return parent.getLanguages();
    }
  }
};
