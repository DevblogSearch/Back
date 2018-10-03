const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const FileStore = require('session-file-store')(session);

const app = express();

// Middleware Settings.
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = require('./config/session_config.json');
app.use(session({
  secret: sessionConfig.secret,
  resave: sessionConfig.resave,
  saveUninitialized: sessionConfig.saveUninitialized,
  // cookie: sessionConfig.cookie,
  store: new FileStore()
}));

const passport = require('./lib/passport')(app);

// Routing setting.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const authRouter = require('./routes/auth')(passport);
const searchRouter = require('./routes/search');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);

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
