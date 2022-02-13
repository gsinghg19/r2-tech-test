const db = require('../connection');
const format = require('pg-format');
const { formatRecipeData } = require('../../utils/utils');

const seed = (data) => {
  return db
    .query('DROP TABLE IF EXISTS recipes;')
    .then(() => {
      return db.query(`CREATE TABLE recipes (
      recipeid VARCHAR(100) NULL,
      instructions VARCHAR(500) NULL,
      imageurl VARCHAR (200) NULL,
      ingredients VARCHAR (200) NULL
    )`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO recipes (recipeId, instructions, imageurl, ingredients)
          VALUES
          %L
          RETURNING *;
      `,
        formatRecipeData(data)
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
