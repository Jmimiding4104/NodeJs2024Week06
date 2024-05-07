const middlewareContent = require('./middlewareContent');
const resErrorDev = require('./resErrorDev');

function middleware(err, req, res, next) {
	if (process.env.NODE_ENV === 'dev') {
		resErrorDev(err,res)
	} else {
		middlewareContent(err, req, res, next)
	}
}

module.exports = middleware;