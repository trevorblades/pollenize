import map from 'lodash/map';
import {Election, User} from '../models';
import {ExtractJwt, Strategy} from 'passport-jwt';

export const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
export default new Strategy(
  {
    jwtFromRequest,
    secretOrKey: process.env.TOKEN_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }

      const organization = await user.getOrganization({
        include: {
          model: Election,
          attributes: ['id']
        }
      });

      user.setDataValue('election_ids', map(organization.elections, 'id'));
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
