import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Keyword, Message} from '../db.js';
import {bulkCreateUpdate, getMessageResolver} from '../utils.js';

export const typeDef = gql`
  extend type Mutation {
    createKeyword(word: MessageInput!, electionId: ID!): Keyword
    updateKeyword(
      id: ID!
      words: [MessageInput]!
      definitions: [MessageInput]!
    ): Keyword
  }

  extend type Election {
    keywords: [Keyword]
  }

  type Keyword {
    id: ID!
    word(languageId: ID!): String
    definition(languageId: ID!): String
  }
`;

export const resolvers = {
  Mutation: {
    async createKeyword(parent, {word, electionId}, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      return Keyword.create(
        {
          words: [word],
          electionId
        },
        {
          include: {
            model: Message,
            as: 'words'
          }
        }
      );
    },
    async updateKeyword(parent, {id, words, definitions}, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const keyword = await Keyword.findByPk(id);
      if (!keyword) {
        throw new UserInputError('Keyword not found');
      }

      const newWords = await bulkCreateUpdate(words, Message);
      await keyword.setWords(newWords);

      const newDefinitions = await bulkCreateUpdate(definitions, Message);
      await keyword.setDefinitions(newDefinitions);

      return keyword;
    }
  },
  Election: {
    keywords: election => election.getKeywords()
  },
  Keyword: {
    word: getMessageResolver('getWords'),
    definition: getMessageResolver('getDefinitions')
  }
};
