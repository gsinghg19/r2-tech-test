const devData = require("../R2_tech/R2_tech");
const seed = require("./seed.js");
const db = require("../connection");

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
