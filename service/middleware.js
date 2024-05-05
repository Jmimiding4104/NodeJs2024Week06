const middlewareContent = require('./middlewareContent');

function middleware(err, req, res, next) {
	if (process.env.NODE_ENV === 'dev') {
		process.on('unhandledRejection', (reason, promise) => {
			console.error('未捕捉到的 rejection：', promise, '原因：', reason);
		});
		middlewareContent(err, req, res, next)
	} else {
		middlewareContent(err, req, res, next)
	}
}

module.exports = middleware;