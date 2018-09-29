const express = require('express');
const template = require('../lib/template');
const auth = require('../lib/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "Welcome";
  let body = "Hello!"
  let html = template.HTML(title, body, auth.StatusUI(req, res));
  res.send(html);
});

module.exports = router;