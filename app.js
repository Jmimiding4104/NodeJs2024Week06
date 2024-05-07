const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const middleware = require('./service/middleware');

const notFound = require('./service/notFound')

const app = express();

const {uncaughtExceptionFn, unhandledRejectionFn} = require('./service/processError')

process.on('uncaughtException', err => {
  uncaughtExceptionFn(err)
});

require('dotenv').config();
require('./connections');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  middleware(err, req, res, next)
});

app.use((req, res, next) => {
  notFound(req, res)
});

process.on('unhandledRejection', (reason, promise) => {
  unhandledRejectionFn(reason, promise)
});

module.exports = app;
