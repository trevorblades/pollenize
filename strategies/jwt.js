import {Strategy, ExtractJwt} from 'passport-jwt';
import {User, Organization, Election} from '../models';

export const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
export default new Strategy(
  {
    jwtFromRequest,
    secretOrKey: process.env.TOKEN_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub, {
        include: {
          model: Organization,
          include: {
            model: Election,
            attributes: ['id']
          }
        }
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
