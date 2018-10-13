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
    <link rel="stylesheet" href="stylesheet/login.min.css" type="text/css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="login-form">
<form action="/auth/login_process" method="post">
    <h2 class="text-center">나랏말싸미</h2><br>		
    <div class="text-center social-btn">
        <a href="/auth/facebook" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i> <b>Facebook</b> 으로 로그인</a>
        <a href="/auth/google" class="btn btn-danger btn-block"><i class="fa fa-google"></i> <b>Google</b> 으로 로그인</a>
        <a href="/auth/github" class="btn btn-dark btn-block"><i class="fa fa-github"></i> <b>Github</b> 으로 로그인</a>
    </div>
    <div class="or-seperator"></div>
    <div class="form-group">
        <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-user"></i></span>
            <input type="text" class="form-control" name="email" placeholder="Email" required="required">
        </div>
    </div>
    <div class="form-group">
        <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
            <input type="password" class="form-control" name="pwd" placeholder="Password" required="required">
        </div>
    </div>        
    <div class="form-group"> 
        <button type="submit" class="btn btn-success btn-block login-btn" value="login">로그인</button>
    </div>
    <div class="clearfix">
        <label class="pull-left checkbox-inline"><input type="checkbox"> 계정 기억하기</label>
        <a href="#" class="pull-right text-success">비밀번호를 잊으셨나요?</a>
    </div>  
    
</form>
<div class="hint-text small">계정이 없나요? <a href="/auth/register" class="text-success">회원가입</a></div>
</div>
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