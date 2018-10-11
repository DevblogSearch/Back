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
  const n = req.query.n;
  //for paging
  const start = (req.query.start - 1) * n;
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
        let searchResult = template.parseSearchResponse(response)
        let header = `
          <div class="search-bar ">
            <div class="row">
                <div class="col-md-5">
                    <div class="input-group">
                      <form action="/">
                        <input type = "text" class="form-control" placeholder="검색어를 입력해주세요" value="${q}">
                      </form>
                      <span class="input-group-btn">
                        <button class="btn blue uppercase bold">검색</button>
                      </span>
                    </div>
                </div>
                <div id="login">
                ` + auth.StatusUI(req,res) + `
                </div>
            </div>
          </div>
        `;
        let html = template.HTML('나랏말싸미 - ' + q, '', header, searchResult);
        res.send(html);
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
