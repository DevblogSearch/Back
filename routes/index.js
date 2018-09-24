const express = require('express');
const template = require('../lib/template');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "Welcome";
  let body = "Hello!"
  let html = template.HTML(title, body);
  res.send(html);
});

module.exports = router;