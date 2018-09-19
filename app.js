// Import modules.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 라우팅 설정.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware Settings. 그냥 설정이니 신경쓰지 않으셔도.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우트가 /로 시작하면 index.js 에서 라우팅 하시면 됩니다.
app.use('/', indexRouter);
// 라우트가 /user 로 시작하면 user.js 에서 라우팅 하시면 됩니다.
app.use('/user', usersRouter);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;