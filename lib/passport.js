const db = require('../lib/db');
const bcrypt = require('bcrypt');

module.exports = function (app) {

  const passport = require('passport')

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    let user = db.get('users').find({ id: id }).value();
    done(null, user);
  });
  
  const LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd',
    },
    (email, password, done) => {
      let user = db.get('users').find({ email: email }).value();
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            return done(null, user, {
              message: 'Welcome.'
            });
          } else {
            return done(null, false, {
              message: 'Password is not correct'
            });
          }
        });
      } else {
        return done(null, false, {
          message: 'Wrong email.'
        });
      }
    }
  ));

  const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  const googleCredentials = require('../config/google_OAuth.json');

  passport.use(new GoogleStrategy({
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris[0]
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('Google Strategy', accessToken, refreshToken, profile);
    // User.findOrCreate({ googleId: profile.id }, (err, user) => {
    //   return done(err, user);
    // });
  }
  ));

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  return passport;
}