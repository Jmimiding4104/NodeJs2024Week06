const appError = require("./appError");

function handleErrorAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next)
      .catch((err) => {
        return next(err);
      });
  };
}

module.exports = handleErrorAsync;