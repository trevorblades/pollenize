import {Election} from '../db';
import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Query {
    elections: [Election]
    election(id: ID!): Election
  }

  type Election {
    id: ID
    slug: String
    title: String
    flag: String
    public: Boolean
    partyFirst: Boolean
    endsAt: String
  }
`;

export const resolvers = {
  Query: {
    elections() {
      return Election.findAll({
        where: {
          public: true
        }
      });
    },
    election(parent, args) {
      return Election.findOne({
        where: {
          id: args.id,
          public: true
        }
      });
    }
  }
};
