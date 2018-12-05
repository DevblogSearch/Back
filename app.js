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
const solrClient = require('./lib/solr')();
const app = express();
const template = require('./lib/template');
const bookmark = require('./lib/bookmark');

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
const events = require('./routes/events');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use('/document', documentRouter);
app.use('/autocomplete', autocomplete);
app.use('/events', events);

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

app.get(('/bookmark'), async (req, res) => {
  
  let bookmark_resource = '<script src="/javascript/bookmark.js"></script>';
  bookmark_resource += '<link href="/stylesheet/bookmark.css" rel="stylesheet" type="text/css" />';

  req.query.page = 1;
  req.query.id = req.user.id;

  let previews = await bookmark.showBookmarkList(req, res);
  console.log(previews);

  let body = `
    <div id = "common header" >
      <h1 class = "col-xs-10 col-lg-offset-1 col-lg-7"> 북마크 </h1>
    </div>
    <div id ="bookmark_container">
      <ul id="bookmark_list" class= "col-xs-12 col-sm-12 col-md-12 col-lg-11">
  `;
  for (elem of previews) {
    if (elem.image[0] === '/') {
      elem.image = '/images/Chosung_on_grid_1.png';
    }
    body += `
      <li class="bookmark col-xs-12 col-md-3 col-lg-offset-1 col-lg-3">
        <div class="bookmark_content">
          <img src=${elem.image} height="200px" width="100%">
          <h3>
            <a href=${elem.url}>${elem.title}</a>
          </h3>
          <div class="bookmark_description">
            ${elem.description}
          </div> 
        </div>
        <div class="bookmark_del">
          <button class = "delete_button">✖</button>
        </div>
     </li>
    `;
  }

  body += '</ul></div>';

  // <script> appendBookmark(); </script>
  res.send(template.HTML('북마크', bookmark_resource, body, '', ''));
});

app.get('/bookmark/list', async (req, res) => {
  try {
    let previews = await bookmark.showBookmarkList(req, res);
    console.log(previews);
    previews = JSON.stringify(previews);
    res.end(previews);
  } catch(err) {
    res.status(403).end();
    console.log(err);
  }

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
