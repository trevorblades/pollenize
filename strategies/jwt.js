import {Strategy, ExtractJwt} from 'passport-jwt';
import {User} from '../models';

export default new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
