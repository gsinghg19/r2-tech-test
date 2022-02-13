// const server = require("./server");

// server.listen(9090, () => {
//   console.log("server listening on 9090");
// });

const server = require("./server");
const { PORT = 9090 } = process.env;

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
