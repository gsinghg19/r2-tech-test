const { formatSingleRecipeData } = require('../utils/utils');
const { insertNewRecipe } = require('../models/recipes.models');

const {
  fetchAllRecipes,
  insertNewRecipeById,
} = require('../models/recipes.models');

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

    //console.log(allRecipes);

    const formattedRecipes = allRecipes.map((recipePara) => {
      return {
        recipeId: recipePara.recipeid,
        instructions: recipePara.instructions,
        imageurl: recipePara.imageurl,
        ingredients: JSON.parse(recipePara.ingredients),
      };
    });
    // console.log(formattedRecipes);
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
