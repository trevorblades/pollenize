import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Message, Source, Stance, sequelize} from '../db';
import {bulkCreateUpdate, getMessageResolver} from '../utils';

// TODO: update mutations for multiple langs
export const typeDef = gql`
  extend type Mutation {
    createStance(
      topicId: ID!
      candidateId: ID!
      messages: [MessageInput]!
      sources: [SourceInput]!
    ): Stance
    updateStance(
      id: ID!
      messages: [MessageInput]!
      sources: [SourceInput]!
    ): Stance
    deleteStance(id: ID!): ID
  }

  extend type Topic {
    stances: [Stance]
  }

  extend type Candidate {
    stances: [Stance]
  }

  type Stance {
    id: ID
    text(languageId: ID!): String
    topicId: ID
  }
`;

export const resolvers = {
  Mutation: {
    createStance(parent, args, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      return Stance.create(args, {
        include: [Source, Message]
      });
    },
    async updateStance(parent, args, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const stance = await Stance.findByPk(args.id);
      if (!stance) {
        throw new UserInputError('Stance not found');
      }

      const messages = await bulkCreateUpdate(args.messages, Message);
      await stance.setMessages(messages);

      const sources = await bulkCreateUpdate(args.sources, Source);
      await stance.setSources(sources);

      return stance;
    },
    async deleteStance(parent, args, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const stance = await Stance.findByPk(args.id);
      if (!stance) {
        throw new UserInputError('Stance not found');
      }

      await stance.destroy();
      return stance.id;
    }
  },
  Topic: {
    stances(parent) {
      return parent.getStances({
        attributes: [
          // hack to return one stance per candidate
          // see https://github.com/sequelize/sequelize/issues/5475#issuecomment-343691692
          // TODO: make this consistent with the first stance chosen in the candidate pages
          sequelize.literal('distinct on("candidateId") 1'),
          ...Object.keys(Stance.rawAttributes)
        ],
        order: ['candidateId', 'id']
      });
    }
  },
  Candidate: {
    stances(parent) {
      return parent.getStances({
        order: ['id']
      });
    }
  },
  Stance: {
    text: getMessageResolver()
  }
};
