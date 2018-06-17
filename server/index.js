import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import {sequelize} from './models';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

sequelize
  .sync()
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    )
  );
