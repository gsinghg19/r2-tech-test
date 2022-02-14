const db = require('../data/connection');
const fsPromises = require('fs').promises;

exports.fetchEndPoints = async () => {
  const data = await fsPromises.readFile('./endpoints.json', 'utf8');
  return JSON.parse(data.toString());
};
