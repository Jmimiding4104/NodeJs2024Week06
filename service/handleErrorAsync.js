const appError = require("./appError");

function handleErrorAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next)
      .catch((err) => {
        if (err.name === 'CastError' && err.kind === 'ObjectId') {
          return next(err);
        } else {
          return next(err);
        }
      });
  };
}

module.exports = handleErrorAsync;