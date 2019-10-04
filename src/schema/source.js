import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Stance {
    sources: [Source]
  }

  input SourceInput {
    id: ID
    url: String!
  }

  type Source {
    id: ID
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
