function successHandle(res, data,statusCode = 200) {
    res.status(statusCode).send({
        status: 'true',
        data: data
    }).end();
};

module.exports = successHandle;