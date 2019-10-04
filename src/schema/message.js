import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Stance {
    messages: [Message]
  }

  extend type Topic {
    titles: [Message]
    descriptions: [Message]
  }

  extend type Candidate {
    parties: [Message]
    bios: [Message]
  }

  input MessageInput {
    id: ID
    text: String!
    languageId: ID!
  }

  type Message {
    id: ID
    text: String
    languageId: ID
  }
`;

export const resolvers = {
  Stance: {
    messages(parent) {
      return parent.getMessages();
    }
  },
  Topic: {
    titles(parent) {
      return parent.getTitles();
    },
    descriptions(parent) {
      return parent.getDescriptions();
    }
  },
  Candidate: {
    parties(parent) {
      return parent.getParties();
    },
    bios(parent) {
      return parent.getBios();
    }
  }
};
