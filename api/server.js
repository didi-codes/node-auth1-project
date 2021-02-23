const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex');

const usersRouter = require('./users/users-router.js');

const config = {
  name: 'sessionId',
  secret: 'Never reveal your password',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUnitialized: false,

  store: new KnexSessionStore({
    knex: require('../database/connection.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createTable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

const server = express();

server.use(session(config));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;

