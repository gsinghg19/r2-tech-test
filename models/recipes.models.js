const res = require('express/lib/response');
const { query } = require('../data/connection');
const db = require('../data/connection');

const {
  checkSortByExists,
  checkOrderExists,
  dbSearch,
} = require('../utils/utils');

exports.fetchAllRecipes = async (reqQueries = []) => {
  const selectString = `SELECT * FROM recipes WHERE 1=1`;
  let andString = '';

  if (reqQueries.length != 0) {
    reqQueries.forEach((ingredient) => {
      andString = andString + ` AND ingredients NOT LIKE '%${ingredient}%'`;
    });
  }

  const queryString = selectString + andString;

  const result = await db.query(queryString);

  return result.rows;
};

exports.insertNewRecipe = async (newRecipe) => {
  const { imageurl, instructions, ingredients } = newRecipe;
  
  console.log('line------------------------------------');

  const result = await db.query(
    `INSERT INTO recipes(recipeid, imageurl, instructions, ingredients) VALUES (uuid_in(md5(random()::text || clock_timestamp()::text)::cstring), $1, $2, $3) RETURNING*;`,
    [imageurl, instructions, ingredients]
  );
  return result.rows;
};
