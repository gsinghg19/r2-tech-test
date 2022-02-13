const { fetchEndPoints } = require('../models/data.models.api');

exports.getEndPoints = async (req, res, next) => {
  try {
    const showEndPoints = await fetchEndPoints();
    res.status(200).send(showEndPoints);
  } catch (err) {
    next(err);
  }
};
