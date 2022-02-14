const { formatSingleRecipeData } = require('../utils/utils');
const { insertNewRecipe } = require('../models/recipes.models');
const { fetchAllRecipes } = require('../models/recipes.models');
const { fetchSingleRecipeById } = require('../models/recipes.models');

exports.getAllRecipes = async (req, res, next) => {
  try {
    const queryParameters = req.query;

    let allRecipes;

    if (Object.keys(queryParameters).length != 0) {
      const excludedIngredients = queryParameters.exclude;
      const excludedIngredientsArr = excludedIngredients.split(',');
      allRecipes = await fetchAllRecipes(excludedIngredientsArr);
    } else {
      allRecipes = await fetchAllRecipes();
    }

    const formattedRecipes = allRecipes.map((recipe) => {
      return {
        recipeId: recipe.recipeid,
        instructions: recipe.instructions,
        imageurl: recipe.imageurl,
        ingredients: JSON.parse(recipe.ingredients),
      };
    });

    res.status(200).send({ formattedRecipes });
  } catch (err) {
    next(err);
  }
};

exports.postNewRecipe = async (req, res, next) => {
  try {
    const recipe = req.body;
    const formattedRecipe = formatSingleRecipeData(recipe);
    const PostedNewComment = await insertNewRecipe(formattedRecipe);
    res.status(201).send({ PostedNewComment });
  } catch (err) {
    next(err);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipeid = req.params.recipesId;

    const recipePara = await fetchSingleRecipeById(recipeid);

    const recipeFix = {
      recipeId: recipePara[0].recipeid,
      instructions: recipePara[0].instructions,
      imageurl: recipePara[0].imageurl,
      ingredients: JSON.parse(recipePara[0].ingredients),
    };

    res.status(200).send(recipeFix);
  } catch (err) {
    next(err);
  }
};
