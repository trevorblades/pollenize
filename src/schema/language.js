import {Language} from '../db';
import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Query {
    languages: [Language]
  }

  type Language {
    id: ID
    code: String
    name: String
  }
`;

export const resolvers = {
  Query: {
    languages() {
      return Language.findAll();
    }
  }
};
