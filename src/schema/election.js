import {Election} from '../db';
import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Query {
    elections(filter: FilterInput): [Election]
    election(id: ID!): Election
  }

  input FilterInput {
    public: Boolean
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
    elections(parent, args) {
      return Election.findAll({
        where: args.filter,
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
