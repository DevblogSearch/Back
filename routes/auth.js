const express = require('express');
const template = require('../lib/template.js');
const db = require('../lib/db');

module.exports = function (passport) {

  const router = express.Router();

  router.get('/login', (req, res) => {
    let title = 'WEB - login';
    let html = template.HTML(title,`
      <script src="javascript/plugins/geometryangle/geometryangle.min.js"></script>    
      <link rel="stylesheet" href="/stylesheet/login.min.css" type="text/css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

      <script type="text/javascript">
      $(document).ready(function(){
        $('body').Geometryangle({mesh:{}, lights: [{}], line: {}, vertex: {}});
      });
      </script>
    `, `
      <div style="position: fixed; left: 0;right: 0;top: 0; bottom: 0;"></div>
      <div class="login-form">
      <form action="/auth/login_process" method="post">
      <h2 class="text-center">나랏말싸미</h2><br>		
      <div class="text-center social-btn">
        <a href="/auth/facebook" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i> <b>Facebook</b> 으로 로그인</a>
        <a href="/auth/google" class="btn btn-danger btn-block"><i class="fa fa-google"></i> <b>Google</b> 으로 로그인</a>
        <a href="/auth/github" class="btn btn-dark btn-block"><i class="fa fa-github"></i> <b>Github</b> 으로 로그인</a>
      </div>
    `, '', '');
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
    `, '', '');
    res.send(html);
  });


  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
}