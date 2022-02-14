const express = require('express');
const recipesRouter = express.Router();
const { getAllRecipes } = require('../Controllers/recipes.controllers');
const { postNewRecipe } = require('../Controllers/recipes.controllers');
const { getRecipeById } = require('../Controllers/recipes.controllers');

// recipesRouter.route('/').get(getAllRecipes).post(postNewRecipe);
recipesRouter.route('/recipes').get(getAllRecipes).post(postNewRecipe);
recipesRouter.route('/recipes/:recipesId').get(getRecipeById);

module.exports = recipesRouter;
