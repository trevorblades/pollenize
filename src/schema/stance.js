import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Source, Stance, sequelize} from '../db';
import {getMessageResolver} from '../utils';

// TODO: update mutations for multiple langs
export const typeDef = gql`
  extend type Mutation {
    createStance(
      topicId: ID!
      candidateId: ID!
      textEn: String
      textFr: String
      sources: [SourceInput]
    ): Stance
    updateStance(
      id: ID!
      textEn: String
      textFr: String
      sources: [SourceInput]
    ): Stance
    deleteStance(id: ID!): ID
  }

  input SourceInput {
    id: ID
    url: String!
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
        include: [Source]
      });
    },
    async updateStance(parent, {id, sources, ...args}, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const stance = await Stance.findByPk(id);
      if (!stance) {
        throw new UserInputError('Stance not found');
      }

      const oldSources = await Promise.all(
        sources
          .filter(source => source.id)
          .map(async ({id, url}) => {
            const source = await Source.findByPk(id);
            return source.update({url});
          })
      );

      const newSources = await Source.bulkCreate(
        sources.filter(source => !source.id),
        {returning: true}
      );

      await stance.setSources([...oldSources, ...newSources]);
      return stance.update(args);
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
