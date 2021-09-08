import cors from 'cors';
import express from 'express';
import handleAuth from './auth.js';
import http from 'http';
import jwt from 'jsonwebtoken';
import schema from './schema/index.js';
import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {User, sequelize} from './db.js';

const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://pollenize.org'
        : /http:\/\/localhost:\d{4}/
  })
);

app.get('/auth', handleAuth);

const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  async context({req}) {
    try {
      const matches = req.headers.authorization.match(/bearer (\S+)/i);
      const {sub} = jwt.verify(matches[1], process.env.TOKEN_SECRET);
      const user = await User.findByPk(sub);
      return {user};
    } catch (error) {
      return {};
    }
  }
});

(async () => {
  await sequelize.sync();
  await server.start();
  server.applyMiddleware({app});
  await new Promise(resolve =>
    httpServer.listen({port: process.env.PORT}, resolve)
  );
  console.log(
    `🐝 Server ready at http://localhost:${
      process.env.PORT + server.graphqlPath
    }`
  );
})();
