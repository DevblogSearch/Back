const express = require('express');
const template = require('../lib/template.js');

module.exports = function(passport) {

  const router = express.Router();

  router.get('/login', (request, response) => {
    let title = 'WEB - login';
    let html = template.HTML(title,
      `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="emain"></p>
        <p>
          <textarea type="password" name="pwd" placeholder="password"></textarea>
        </p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
      `
    );
    response.send(html);
  });
  
  router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });
  
  router.post('/login_process',
    passport.authenticate(('local'), {
      successRedirect: '/',
      failureRedirect: '/auth/login',
    })
  );

  return router;
}