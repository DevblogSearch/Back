// const db = require('../lib/db');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('./db.js');

module.exports = function (app) {

  const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GitHubStrategy = require('passport-github').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serializeUser: ', user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('Deserialize user');
    db.User.findOne({ where: {id: id}})
      .then(user => {
        done(null, user);
      });
  });

  function oAuthLoginProcess(accessToken, refreshToken, profile, done) {
    let email = profile.emails[0].value;
    db.User.findOrCreate({ where: {email: email}, defaults: {displayName: profile.displayName} })
      .spread((user, created) => {
        done(null, user);
      });
  }

  const googleCredentials = require('../config/google_OAuth.json');
  passport.use(new GoogleStrategy(googleCredentials, oAuthLoginProcess));

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'email']
    })
  );
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/auth/login'
    }),
    (req, res) => {
      res.redirect('/');
    }
  );

  const facebookCredentials = require('../config/facebook_OAuth.json');
  facebookCredentials.profileFields = ['id', 'emails', 'name', 'displayName'];
  passport.use(new FacebookStrategy(facebookCredentials,oAuthLoginProcess));

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope:['email']
  }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/auth/login'
    })
  );

  const githubCredentials = require('../config/github_OAuth.json');
  githubCredentials.scope = [ 'user:email' ];
  passport.use(new GitHubStrategy(githubCredentials, oAuthLoginProcess));
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

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

  return passport;
}