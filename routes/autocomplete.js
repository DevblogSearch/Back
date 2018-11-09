const express = require('express');
const request = require('async-request');
const qs = require('querystring');
const Hangul = require('hangul-js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const q = req.query.q;
  const query = `http://localhost:8983/solr/naratmalssm/suggest?suggest=true&suggest.q=${qs.escape(q)}`;
  try{
      const solrResult = await request(query);
      const body = JSON.parse(solrResult.body);
      const suggest = Object.values(body.suggest.autoComplete)[0].suggestions;

      var results = [];
      console.log(suggest);
      suggest.forEach(function (x) {
        results.push(Hangul.assemble(x.term));
      });

      if(!res.headersSent) {
          res.json(results);
      }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }

  //solr가 장애가 생길경우를 대비해서 1초 timeout
  setTimeout(function(){
    if(!res.headersSent) {
      res.status(408).end();
    }
  }, 1000);

});

module.exports = router;
