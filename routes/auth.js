const express = require('express');
const template = require('../lib/template.js');
const shortid = require('shortid');
const db = require('../lib/db');
const bcrypt = require('bcrypt');

module.exports = function(passport) {

  const router = express.Router();

  router.get('/login', (req, res) => {
    let title = 'WEB - login';
    let html = template.HTML(title, `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p>
          <textarea type="password" name="pwd" placeholder="password"></textarea>
        </p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
    `, '');
    res.send(html);
  });
  
  router.post('/login_process',
    passport.authenticate(('local'), {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  }));
  
  router.get('/register', (req, res) => {
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
    res.send(html);
  });

  router.post('/register_process', (req, res) => {
    let post = req.body;
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
      let user = db.get('users').find({ email: email }).value();
      if (user) {
        user.password = hash;
        user.displayName = displayName;
        db.get('users').find({ id: user.id }).assign(user).write();
      } else {
        user = {
          id: shortid.generate(),
          email: email,
          password: hash,
          displayName: displayName
        };
      }
      db.get('users').push(user).write();

      req.login(user, (err) => res.redirect('/'));
    });
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
}