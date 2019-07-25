import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Stance {
    sources: [Source]
  }

  type Source {
    url: String
  }
`;

export const resolvers = {
  Stance: {
    sources(parent) {
      return parent.getSources();
    }
  }
};
