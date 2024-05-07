function uncaughtExceptionFn(err) {
    console.error('Uncaughted Exception！')
    console.error(err);
    process.exit(1);
};

function unhandledRejectionFn(reason, promise){
    console.error('未捕捉到的 rejection：', promise, '原因：', reason);
};

module.exports = {uncaughtExceptionFn, unhandledRejectionFn};