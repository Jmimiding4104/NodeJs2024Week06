const errHandle = require('./errHandle');

function middlewareContent(err, req, res, next) {
  if (err.isOperational == true) {
    errHandle(err, res);
  } else {
    res.status(500).send({
      statusCode: 500,
      status: false,
      message: "發生未知錯誤~請回報管理員",
    }).end();
  }
}

module.exports = middlewareContent;