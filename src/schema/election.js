import {Election} from '../db';
import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Query {
    elections: [Election]
    election(id: ID!): Election
  }

  extend type Candidate {
    election: Election
  }

  type Election {
    id: ID
    slug: String
    title: String
    flag: String
    introEn: String
    introFr: String
    partyFirst: Boolean
    public: Boolean
    endsAt: String
  }
`;

export const resolvers = {
  Query: {
    elections() {
      return Election.findAll({
        where: {
          public: true
        },
        order: [['endsAt', 'desc']]
      });
    },
    election(parent, args) {
      return Election.findByPk(args.id);
    }
  },
  Candidate: {
    election(parent) {
      return parent.getElection();
    }
  }
};
