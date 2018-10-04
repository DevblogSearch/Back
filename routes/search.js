const express = require('express');
var SolrNode = require('solr-node');
const template = require('../lib/template');
const auth = require('../lib/auth');
const solrClient = require('../lib/solr')();

const router = express.Router();

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

  const query = solrClient.query()
    .q(buildQueryString(q))
    .addParams({
      wt: "json"
    })
    .start(start)
    .rows(n);
  console.log(query);
  solrClient.search(query, function(err, result) {
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
            // res.json(response);
            let searchResult = template.parseSearchResponse(response)
            let html = template.HTML('Search Result', '', auth.StatusUI(req, res), searchResult);
            res.send(html);
            //res.send('<p>hey</p>');
          },
      'application/json': function(){
            res.json(response);
          },
    });
    console.log(response);
    return;
  });

});

module.exports = router;
