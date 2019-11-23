import bcrypt from 'bcryptjs';
import {Op} from 'sequelize';
import {User} from '../db';
import {UserInputError, gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Mutation {
    setPassword(
      email: String!
      password: String!
      confirmPassword: String!
    ): String
  }
`;

export const resolvers = {
  Mutation: {
    async setPassword(parent, args) {
      const user = await User.findOne({
        where: {
          email: {
            [Op.iLike]: args.email
          },
          password: null
        }
      });

      if (!user) {
        throw new UserInputError('User not found');
      }

      if (args.password !== args.confirmPassword) {
        throw new UserInputError("Passwords don't match");
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(args.password, salt);
      await user.update({password});
      return user.toJWT();
    }
  }
};
