function errHandle(err, res) {
    res.status(err.statusCode).send({
        statusCode: err.statusCode,
        status: false,
        message: err.message,
    }).end();
}

module.exports = errHandle;