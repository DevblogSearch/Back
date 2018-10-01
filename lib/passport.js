const db = require('../lib/db');
const bcrypt = require('bcrypt');

module.exports = function (app) {

  const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    let user = db.get('users').find({ id: id }).value();
    done(null, user);
  });

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

  return passport;
}
