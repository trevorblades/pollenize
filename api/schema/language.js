import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Election {
    language: Language
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
    language(parent) {
      return parent.getLanguage();
    },
    languages(parent) {
      return parent.getLanguages();
    }
  }
};
