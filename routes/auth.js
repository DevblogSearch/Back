const express = require('express');
const template = require('../lib/template.js');
const shortid = require('shortid');
const db = require('../lib/db');
const bcrypt = require('bcrypt');

module.exports = function(passport) {

  const router = express.Router();

  router.get('/login', (request, response) => {
    let title = 'WEB - login';
    let list = template.list(request.list);
    let html = template.HTML(title, list, `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="emain"></p>
        <p>
          <textarea type="password" name="pwd" placeholder="password"></textarea>
        </p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
    `, '');
    response.send(html);
  });
  
  router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });
  
  // 로그인 정보를 받았을때 어떻게 처리할껀지.
  router.post('/login_process',
    passport.authenticate(('local'), { // 로컬 전략을 쓰겠다.
    successRedirect: '/',
    failureRedirect: '/auth/login',
  }));

  router.get('/register', (request, response) => {
    let title = 'WEB - login';
    let html = template.HTML(title, `
      <form action="/auth/register_process" method="post">
        <p><input type="text" name="email" placeholder="emain"></p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p><input type="password" name="pwdConfirm" placeholder="password"></p>
        <p><input type='text' name="displayName" placeholder="display name"></p>
        <p><input type="submit" value="Register"></p>
      </form>
    `, '');
    response.send(html);
  });

  router.post('/register_process', (request, response) => {
    let post = request.body;
    let email = post.email;
    let pwd = post.pwd;
    let pwdComfirm = post.pwdComfirm;
    let displayName = post.displayName;
    
    if (pwd !== pwdComfirm) {
      // TODO Login exception handling.
      // request.flash('error', 'Password must same!');
      // response.redirect('/auth/register');
    }

    bcrypt.hash(pwd, 10, (err, hash) => {
      let user = {
        id: shortid.generate(),
        email: email,
        password: hash,
        displayName: displayName
      };

      db.get('users').push(user).write();

      request.login(user, (err) => response.redirect('/'));
    });
  });

  return router;
}