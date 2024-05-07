const resErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  };

  module.exports = resErrorDev;