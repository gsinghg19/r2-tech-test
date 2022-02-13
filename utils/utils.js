exports.formatRecipeData = (recipeData) => {
  const formattedRecipeData = recipeData.map((recipe) => {
    return [
      recipe.id,
      recipe.instructions,
      recipe.imageUrl,
      JSON.stringify(recipe.ingredients),
    ];
  });
  return formattedRecipeData;
};

exports.formatSingleRecipeData = (recipeData) => {
  return {
    instructions: recipeData.instructions,
    imageurl: recipeData.imageurl,
    ingredients: JSON.stringify(recipeData.ingredients),
  };
};

exports.checkSortByExists = (sort_by) => {
  if (sort_by === undefined) return 'created_at';
  const validInput = ['recipeId', 'ingredients'];
  if (validInput.includes(sort_by) === true) {
    return sort_by;
  }
  return Promise.reject({ status: 400, msg: '400: Bad request' });
};

exports.checkOrderExists = (order) => {
  if (order === undefined) return 'DESC';
  const validInput = ['asc', 'desc'];
  if (validInput.includes(order) === true) {
    return order;
  }
  return Promise.reject({ status: 400, msg: '400: bad request' });
};

exports.dbSearch = (column, search) => {
  const result = `WHERE ${column} @@ to_tsquery('${search}')`; // --- recheck not sure if correct!!!
  return result;
};
