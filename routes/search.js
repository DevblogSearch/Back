const express = require('express');
var SolrNode = require('solr-node');
const template = require('../lib/template');
const auth = require('../lib/auth');

const router = express.Router();

var client = new SolrNode({
      host: '127.0.0.1',
      port: '8983',
      core: 'naratmalssm',
      protocol: 'http',
      debugLevel: 'ERROR' 
});

function buildQueryString(q) {
  const qstr = `content:${q} OR title:${q}`;
  return qstr;
}

/*search result*/
router.get('/', (req, res, next) => {
  const q = req.query.q;
  const start = req.query.start;
  const n = req.query.n;
  var response = [];

  const query = client.query()
    .q(buildQueryString(q))
    .addParams({
      wt: "json"
    })
    .start(start)
    .rows(n);
  console.log(query);
  client.search(query, function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).end();
      return;
    }
    for (var docIdx in result.response.docs) {
      const doc = result.response.docs[docIdx];
      response.push({title:doc.title, url:doc.url, content:doc.content});
    }
    
    res.format({
      'text/html': function(){
            //TODO should be change to render function
            res.json(response);
            //res.send('<p>hey</p>');
          },
      'application/json': function(){
            res.json(response);
          },
    });
    return;
  });
});

module.exports = router;
