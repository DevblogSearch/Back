// Import modules.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

// Middleware Settings.
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using session. TODO Production 단계에서 config directory 버전관리에서 제거.
const sessionConfig = require('./config/session_config.json');
app.use(session({
  secret: sessionConfig.secret,
  resave: sessionConfig.resave,
  saveUninitialized: sessionConfig.saveUninitialized,
  // cookie: sessionConfig.cookie,
  store: new FileStore()
}));

// Routing setting.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);


// Testing passport.
let authData = {
  HttpOnly: true,
  // secure: true, // Make only in https request.
  email: 'minho@gmail.com',
  password: '11111',
  nickname: 'minho',
};

const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((id, done) => {
  done(null, authData); // id 로 찾은 데이터 값이 req.user로 담기게 됨.
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'pwd',
  failureFlash: true
  },
  (username, password, done) => {
    if (username === authData.email) {
      if (password === authData.password) { 
          return done(null, authData);
      } else {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
    } else {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
  }
));

app.post('/auth/login_process',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  })
);


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