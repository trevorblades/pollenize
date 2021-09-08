import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Message, Topic} from '../db.js';
import {bulkCreateUpdate, getMessageResolver} from '../utils.js';

export const typeDef = gql`
  extend type Mutation {
    updateTopic(
      id: ID!
      titles: [MessageInput]!
      descriptions: [MessageInput]!
      image: String
      order: Int!
    ): Topic
  }

  extend type Election {
    topics: [Topic]
  }

  type Topic {
    id: ID
    slug: String
    title(languageId: ID!): String
    description(languageId: ID!): String
    image: String
    order: Int
  }
`;

export const resolvers = {
  Mutation: {
    async updateTopic(parent, {id, titles, descriptions, ...args}, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const topic = await Topic.findByPk(id);
      if (!topic) {
        throw new UserInputError('Topic not found');
      }

      const newTitles = await bulkCreateUpdate(titles, Message);
      await topic.setTitles(newTitles);

      const newDescriptions = await bulkCreateUpdate(descriptions, Message);
      await topic.setDescriptions(newDescriptions);

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
    title: getMessageResolver('getTitles'),
    description: getMessageResolver('getDescriptions')
  }
};
