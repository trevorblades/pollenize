import {Election} from '../db';
import {gql} from 'apollo-server-express';
import {localize} from '../utils';

export const typeDef = gql`
  extend type Query {
    elections(public: Boolean): [Election]
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
    intro(lang: String!): String
    partyFirst: Boolean
    public: Boolean
    endsAt: String
  }
`;

export const resolvers = {
  Query: {
    elections(parent, args) {
      return Election.findAll({
        where: args.public ? {public: args.public} : null,
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
  },
  Election: {
    intro(parent, args) {
      return localize(
        {
          en: parent.introEn,
          fr: parent.introFr
        },
        args.lang
      );
    }
  }
};
