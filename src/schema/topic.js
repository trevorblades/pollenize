import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Topic} from '../db';
import {localize} from '../utils';

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
    titleEn: String
    titleFr: String
    title(lang: String!): String
    descriptionEn: String
    descriptionFr: String
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
    title(parent, args) {
      return localize(
        {
          en: parent.titleEn,
          fr: parent.titleFr
        },
        args.lang
      );
    },
    description(parent, args) {
      return localize(
        {
          en: parent.descriptionEn,
          fr: parent.descriptionFr
        },
        args.lang
      );
    }
  }
};
