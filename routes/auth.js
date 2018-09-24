const express = require('express');
const template = require('../lib/template.js');

const router = express.Router();

router.get('/login', (req, res) => {
  let title = 'Login';
  let html = template.HTML(title,
  `
  <form action="/auth/login_process" method="post">
    <p><input type="text" name="email" placeholder="email"></p>
    <p>
      <input type="password" name="pwd" placeholder="password"></input>
    </p>
    <p>
      <input type="submit" value="login">
    </p>
  </form>
  `);
  res.send(html);
});

module.exports = router;