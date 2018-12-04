const express = require('express');
const SolrNode = require('solr-node');
const template = require('../lib/template');
const auth = require('../lib/auth');
const solrClient = require('../lib/solr')();
const querystring = require('querystring');
const db = require('../lib/db');
const router = express.Router();
/*
  qstr = `title:"${q}"~100^5.0 OR `
  qstr += `title:"${q}"^7.0 OR `
  qstr += `content:"${q}"^6.0 OR `
  qstr += `content:"${q}"~100^4.0 OR `
  qstr += `_query_:"{!edismax qf='title^2.0 content' mm='2<75%'} ${q}"`
*/
/*
  qstr = `( (title:"${q}"~10 OR title:"${q}") AND (content:"${q}" OR content:"${q}"~100))^3.0`
  qstr += `OR (content:"${q}" OR content:"${q}"~1000)`
*/
function buildQueryString(q) {
  qstr = `title:"${q}"~100^5.0 OR `
  qstr += `content:"${q}"~100^4.0 `
  console.log(qstr);
  return qstr;

}

/*search result*/
router.get('/', (req, res, next) => {
  const q = req.query.q;
  const n = req.query.n;
  //for paging
  const start = (req.query.start - 1) * n;
  var numFound = 0;
  var maxPages = 1;
  var response = [];

  const query = solrClient.query()
    .q(buildQueryString(q))
    .hlQuery('hl=true&hl.fl=*&hl.snippets=2&hl.fragsize=100&hl.method=unified')
    .groupQuery('group=true&group.field=origin_title&&group.ngroups=true')
    .addParams({
      wt: "json",
      debug: true
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
    console.log(result.highlighting)
    //collapse document by grouping title
    //because so many same result and has different url by params or tags
    const groups = result.grouped.title.groups;
    numFound = result.grouped.title.ngroups;  // ?--- matches에 있는 숫자가 매칭된 글의 총 갯수가 맞는가. ('콤마' 검색시 실제 나오는 갯수 11개. matches는 18)
    console.log(numFound + ' , ' + groups.length);

    for (let docIdx in groups) {
      console.log(groups[docIdx]);
      const doc = groups[docIdx].doclist.docs[0];
      var snipset = result.highlighting[doc.url].content;
      if (snipset === undefined) {
          console.log(result.highlighting[doc.url]);
          snipset=[''];
    }
      //trim space and remove html tags using regex
      response.push({title:doc.title, url:doc.url, content:snipset.join().trim().replace(/(<([^>]+)>)/ig,"")});
    }

    res.format({
      'text/html': function() {
        let searchResult = template.parseSearchResponse(response, q, req.query.start, numFound, req.user);
        let header = `

          <script src="javascript/likeEvent.js"></script>

          <div id="search-bar-background"></div>
          <div id="sidebar">
            <div class="close-sidebar">
              <button class = "close_button">✖</button>
            </div>
            ` + auth.StatusUI(req,res) + `
          </div>
          <div id="toggle-btn" class = "visible-xs-block visible-sm-block" >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div id ="overlay"></div>

          <div class="search-page search-content-2">
            <div class="search-bar" style="margin-bottom:0px;">
              <div class="row">
                <div id ="logo-container" class = "visible-lg-block visible-md-block">
                  <a href="/">
                    <img width="130px" width="55px" id="logo-img" src="/images/Chosung_on_grid_1.png" alt="logo">
                  </a>
                </div>
                <div class="reactive-div col-xs-11 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-0 col-lg-5 col-lg-offset-0">
                  <div class="input-group">
                    <form action="/search" method="GET" id="form1">
                      <input id="inputSearch" type = "text" class="form-control" placeholder="검색어를 입력하세요" value="${q}" autocomplete="off" maxlength="100" name="q">
                      <input id="page" type="hidden" name="start" value="1">
                      <input type="hidden" name="n" value="10">
                    </form>
                    <span class="input-group-btn">
                      <button form="form1" class="btn blue uppercase bold">검색</button>
                    </span>
                  </div>
                </div>
                <div id="login" class = "visible-lg-block visible-md-block " >
                ` + auth.StatusUI(req,res) + `
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        let local_library =`
          <link href="/stylesheet/search.min.css" rel="stylesheet" type="text/css" />
        `;
        let html = template.HTML('나랏말싸미 - ' + q, local_library,'', header, searchResult);
        res.send(html);
      },
      'application/json': function(){
        res.json(response);
      },
    });
    return;
  });

});

module.exports = router;
