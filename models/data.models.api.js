const db = require('../data/connection');
const fsPromises = require('fs').promises;

exports.fetchEndPoints = async () => {
  const data = await fsPromises
    .readFile('./data.json', 'utf8') //incorrect, need a file called endplints.json, where it outlines your endpoints, then red this file
    .catch((err) => console.log('data.models, failed to read'));
  return JSON.parse(data.toString());
};
