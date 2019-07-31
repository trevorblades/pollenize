import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Election {
    topics: [Topic]
  }

  type Topic {
    id: ID
    slug: String
    titleEn: String
    titleFr: String
    descriptionEn: String
    descriptionFr: String
    image: String
    order: Int
  }
`;

export const resolvers = {
  Election: {
    topics(parent) {
      return parent.getTopics({
        order: ['order']
      });
    }
  }
};
