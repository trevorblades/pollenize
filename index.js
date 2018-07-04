import basicStrategy from './strategies/basic';
import jwtStrategy from './strategies/jwt';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import routes from './routes';
import {sequelize} from './models';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', routes);

passport.use(basicStrategy);
passport.use(jwtStrategy);

sequelize
  .sync()
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    )
  );
