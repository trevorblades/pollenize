import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Language, Topic} from '../db';

export const typeDef = gql`
  extend type Mutation {
    updateTopic(
      id: ID!
      titleEn: String
      titleFr: String
      descriptionEn: String
      descriptionFr: String
      image: String
      order: Int
    ): Topic
  }

  extend type Election {
    topics: [Topic]
  }

  type Topic {
    id: ID
    slug: String
    title(lang: String!): String
    description(lang: String!): String
    image: String
    order: Int
  }
`;

export const resolvers = {
  Mutation: {
    async updateTopic(parent, {id, ...args}, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const topic = await Topic.findByPk(id);
      if (!topic) {
        throw new UserInputError('Topic not found');
      }

      return topic.update(args);
    }
  },
  Election: {
    topics(parent) {
      return parent.getTopics({
        order: [['order', 'desc']]
      });
    }
  },
  Topic: {
    async title(parent, args) {
      const language = await Language.findOne({
        where: {
          code: args.lang
        }
      });

      const [title] = await parent.getTitles({
        where: {
          languageId: language.id
        }
      });

      return title ? title.text : null;
    },
    async description(parent, args) {
      const language = await Language.findOne({
        where: {
          code: args.lang
        }
      });

      const [description] = await parent.getDescriptions({
        where: {
          languageId: language.id
        }
      });

      return description ? description.text : null;
    }
  }
};
