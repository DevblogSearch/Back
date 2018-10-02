module.exports = function (app) {

  let authData = {
    email: 'minho@gmail.com',
    password: '111111',
    nickname: 'minho'
  };

  const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
      done(null, user.email);
  });

  passport.deserializeUser((id, done) => {
      done(null, authData);
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pwd'
    },
    (username, password, done) => {
      if (username === authData.email) {
        if (password === authData.password) {
          return done(null, authData, {
              message: 'Welcome.'
          });
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
  
  return passport;
}
