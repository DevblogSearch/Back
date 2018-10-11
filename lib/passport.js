const db = require('../lib/db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

module.exports = function (app) {

  const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GitHubStrategy = require('passport-github').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    let user = db.get('users').find({ id: id }).value();
    done(null, user);
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pwd'
    },
    (email, password, done) => {
      console.log('LocalStrategy', email, password);
      let user = db.get('users').find({
        email: email
      }).value();
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            return done(null, user, {
              message: 'Welcome.'
            });
          } else {
            return done(null, false, {
              message: 'Password is not correct.'
            });
          }
        });
      } else {
        return done(null, false, {
          message: 'There is no email.'
        });
      }
    }
  ));

  const googleCredentials = require('../config/google_OAuth.json');
  passport.use(new GoogleStrategy({
      clientID: googleCredentials.web.client_id,
      clientSecret: googleCredentials.web.client_secret,
      callbackURL: googleCredentials.web.redirect_uris[0]
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('GoogleStrategy', accessToken, refreshToken, profile);
      let email = profile.emails[0].value;
      let user = db.get('users').find({ email: email }).value();
      if (user) {
        user.googleId = profile.id;
        db.get('users').find({ id: user.id }).assign(user).write();
      } else {
        user = {
          id: shortid.generate(),
          email: email,
          displayName: profile.displayName,
          googleId: profile.id
        }
        db.get('users').push(user).write();
      }
      done(null, user);
    }
  ));

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'email']
    }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/auth/login'
    }),
    (req, res) => {
      res.redirect('/');
    });

  const facebookCredentials = require('../config/facebook_OAuth.json');
  facebookCredentials.profileFields = ['id', 'emails', 'name', 'displayName'];
  passport.use(new FacebookStrategy(facebookCredentials,
    (accessToken, refreshToken, profile, done) => {
        console.log('FacebookStrategy', accessToken, refreshToken, profile);
        let email = profile.emails[0].value;
        let user = db.get('users').find({ email: email }).value();
        if (user) {
          user.facebookId = profile.id;
          db.get('users').find({email:email}).assign(user).write();
        } else {
            user = {
              id: shortid.generate(),
              email: email,
              displayName: profile.displayName,
              facebookId: profile.id
            }
            db.get('users').push(user).write();
        }
        done(null, user);
      }
  ));

  app.get('/auth/facebook', passport.authenticate('facebook', {
      scope:['email']
  }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
  }));

  const githubCredentials = require('../config/github_OAuth.json');
  passport.use(new GitHubStrategy({
    clientID: githubCredentials.web.client_id,
    clientSecret: githubCredentials.web.client_secret,
    callbackURL: githubCredentials.web.redirect_uris[0],
    scope: [ 'user:email' ]
  },
  (accessToken, refreshToken, profile, cb) => {
    let email = profile.emails[0].value;
    let user = db.get('users').find({email: email}).value();
    if (user) {
      user.githubId = profile.id;
      db.get('users').find({email: email}).assign(user).write();
    } else {
        user = {
          id:shortid.generate(),
          email: email,
          displayName: profile.username,
          githubId: profile.id
        }
        db.get('users').push(user).write();
    }
    cb(null, user);
  }
  ));

  app.get('/auth/github', passport.authenticate('github'));
  
  app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  return passport;
}