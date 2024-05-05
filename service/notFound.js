function notFound(req, res) {
    res.status(404).send({
        status: 'false',
        message: '沒有找到路由~'
    }).end();
};

module.exports = notFound;