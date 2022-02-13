exports.handle204Error = (err, req, res, next) => {
  if (err.code) {
    res.status(204).send({ msg: "No content" });
  } else {
    next(err);
  }
};

exports.handle400Error = (err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handle404Error = (err, req, res, next) => {
  if (err.code) {
    res.status(404).send({ msg: "URL not found" });
  } else {
    next(err);
  }
};

exports.handle405Error = (err, req, res, next) => {
  if (err.code) {
    res.status(405).send({ msg: "Method not allowed" });
  } else {
    next(err);
  }
};

exports.handle500ServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
