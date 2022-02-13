const express = require('express');
const cors = require('cors');
const server = express();
const apiRouter = require('./routes/api.Router');
const {
  handle204Error,
  handle400Error,
  handle404Error,
  handle405Error,
  handle500ServerError,
} = require('./Error_handling');

server.use(express.json());

//cross origin resource sharing
server.use(cors());

server.use('/api', apiRouter);

//Error handlers
server.use(handle204Error);
server.use(handle400Error);
server.use(handle404Error);
server.use(handle405Error);
server.use(handle500ServerError);

server.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Invalid URL' });
});

module.exports = server;
