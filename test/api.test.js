const { sortedIndex, before } = require('lodash');
const db = require('../data/connection');
const testData = require('../data/R2_tech/testData');
const supertest = require('supertest');
const server = require('../server');
const seed = require('../data/seeds/seed');

const request = supertest(server);

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api', () => {
  test('/api', async () => {
    const { body } = await request.get('/api').expect(200);
    expect(body.message).toBe('ok');
  });

  test('200:object with list of endpoints', async () => {
    const { body } = await request.get('/api').expect(200);
    expect(Object.keys(body).length > 1);
  });

  test('404: Invalid URl which returns 404 error and message', async () => {
    const res = await request.get('/api/aMadeUpApi').expect(404);
    expect(res.body.msg).toBe('Invalid URL');
  });
});

describe('GET /api/recipes', () => {
  test('200: returns all available recipes', async () => {
    const { body } = await request.get('/api/recipes').expect(200);
    //console.log(body.formattedRecipes);
    body.formattedRecipes.forEach((recipes) => {
      expect(recipes).toMatchObject({
        recipeId: expect.any(String),
        instructions: expect.any(String),
        imageurl: expect.any(String),
        ingredients: expect.any(Array),
      });
    });
  });

  test('200: returns all available recipes where ingredients excluded', async () => {
    const { body } = await request
      .get('/api/recipes?exclude=kale,coconut')
      .expect(200);
    body.formattedRecipes.forEach((recipes) => {
      expect(recipes).toMatchObject({
        recipeId: expect.any(String),
        instructions: expect.any(String),
        imageurl: expect.any(String),
        ingredients: expect.any(Array),
      });
    });
  });
});

describe('GET /api/recipes/:id', () => {
  test('200: responds with an single recipe corresponding with recipe id', async () => {
    const { body } = await request.get(`/api/recipes/${recipeId}`).expect(200);
    expect(body).toMatchObject({
      imageUrl: expect.any(URL),
      instruction: expect.any(String),
      ingredients: expect.any(String),
    });
  });

  test('404: responds with error for corresponding, valid but non-existent recipe id', async () => {
    const { body } = await request.get(`api/recipes/111122333444`).expect(404);
    expect(body.msg).toBe('Recipe not found');
  });

  test('400: bad recipe_id', async () => {
    const { body } = await request.get(`api/recipes/1234abcd`).expect(400);
    expect(body.msg).toBe('Bad Request');
  });
});

describe('Post /api/recipes/', () => {
  test('201: responds with a new posted recipe', async () => {
    const newRecipe = {
      imageurl: 'http://www.images.com/1888',
      instructions:
        '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
      ingredients: [
        { name: 'demerara sugar', grams: 25 },
        { name: 'flax', grams: 66 },
        { name: 'apple juice', grams: 44 },
        { name: 'oat milk', grams: 198 },
      ],
    };

    const { body } = await request
      .post(`/api/recipes`)
      .send(newRecipe)
      .expect(201);
  });
});
