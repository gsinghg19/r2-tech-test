const server = require('./server');
const { PORT = 9090 } = process.env;

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
