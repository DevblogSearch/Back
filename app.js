const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const FileStore = require('session-file-store')(session);
const db = require('./lib/db');
const queryString = require('query-string');

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
  // store: new FileStore()
}));

const passport = require('./lib/passport')(app);

// Routing setting.
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')(passport);
const searchRouter = require('./routes/search');
const documentRouter = require('./routes/document');
const autocomplete = require('./routes/autocomplete');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use('/document', documentRouter);
app.use('/autocomplete', autocomplete);

app.post(('/blog'), (req, res) => {
  db.Blog.findOrCreate({ where: {url: req.body.content } })
    .spread((url, created) => {
      console.log(url.get({
        plain: true
      }));
      console.log('create: ', created);
      res.send(JSON.stringify({ content: url.id }));
    });
});

app.post('/ping_events', (req, res) => {
  db.PingEvent.create({
    blog_id: 0, // TODO replace by req.body.blog_id
    url: req.query.url
  });

  res.end();
});

app.post('/like_events', (req, res) => {
  console.log(req.body);
  console.log(`Like events user_id : ${req.body.user_id}`);
  console.log(`Like events url : ${req.body.url}`);

  db.User.findOne({
    where: { id: req.body.user_id }
  }).then((user) => {
    db.LikeEvent.findOne({
      where: {user_id: user.id, url: req.body.url}
    }).then(exist => {
      if (!exist) {
        db.LikeEvent.create({
          user_id: user.id,
          url: req.body.url
        });
      } else {
        console.log('Like event already exist');
      }
    });

  }).catch(err => {
    console.log('User not Found!');
  });

  res.end('/');
});

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