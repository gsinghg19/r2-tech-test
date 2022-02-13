const express = require('express');
const apiRouter = express.Router();
const recipesRouter = require('../routes/recipes.Router');

const { getEndPoints } = require('../Controllers/api.controller');

apiRouter.use('/', recipesRouter);

apiRouter.get('/', getEndPoints);

module.exports = apiRouter;
