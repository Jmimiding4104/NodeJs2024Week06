const errHandle = require('./errHandle');

function middlewareContent(err, req, res, next) {
  console.log(err.isOperational)
  if(err.name === 'ValidationError'){
    err.isOperational = true;
    err.statusCode = 400;
    err.message = "輸入內容有誤，麻煩再嘗試一次~"
    console.log(res)
  }
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