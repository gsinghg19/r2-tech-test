const { formatRecipeData } = require('../utils/utils');

describe('formatRecipeData', () => {
  test('returns an empty array with no data', () => {
    const recipeData = [];
    const expectedFormattedData = [];
    expect(formatRecipeData(recipeData)).toEqual(expectedFormattedData);
  });

  test('returns a nested array with the props of; (id, instructions, imageUrl, ingredients)', () => {
    const recipeData = [
      {
        id: 'recipe-59',
        imageUrl: 'http://www.images.com/18',
        instructions:
          '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
        ingredients: [
          { name: 'demerara sugar', grams: 25 },
          { name: 'flax', grams: 66 },
          { name: 'apple juice', grams: 44 },
          { name: 'oat milk', grams: 198 },
        ],
      },
    ];

    const expectedFormattedData = [
      [
        'recipe-59',
        '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
        'http://www.images.com/18',
        '[{"name":"demerara sugar","grams":25},{"name":"flax","grams":66},{"name":"apple juice","grams":44},{"name":"oat milk","grams":198}]',
      ],
    ];
    expect(formatRecipeData(recipeData)).toEqual(expectedFormattedData);
  });
});
