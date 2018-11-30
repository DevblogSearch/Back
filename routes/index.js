const express = require('express');
const template = require('../lib/template');
const auth = require('../lib/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "나랏말싸미_main";
  let header = `
    <div class ="login-main-mob visible-xs-block visible-sm-block" >
    ` + auth.StatusUI(req,res) + `
    </div>

    <div class ="login-main-pc visible-lg-block visible-md-block" >
    ` + auth.StatusUI(req,res) + `
    </div>
  `;
  let body = `
    <div class="reactive-div col-lg-4 col-lg-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" id="main">
    <div id="area-logo">
      <div>
        <a href="#">
          <img id="logo-img" src="/images/king_sejong.jpg" class="img-responsive center-block">
        </a>
      </div>
    </div>
    <div class="input-group">
    <form action="/search" method="GET" id="form1">
        <input id="inputSearch" type = "text" class="form-control" placeholder="검색어를 입력하세요" style="height: 44px" autocomplete="off" maxlength="100" name="q">
        <input type="hidden" name="start" value="1">
        <input type="hidden" name="n" value="10">
      </form>
      <span class="input-group-btn">
        <button form="form1" class="btn blue uppercase bold" style="height: 44px; border-left-width: 0px;">검색</button>
      </span>
    </div>
    </div>
    `;
  let local_library = `
    <link href="/stylesheet/index.css" rel="stylesheet" type="text/css" />
  `;
  let html = template.HTML(title, local_library, body, header,"");
  res.send(html);
});

module.exports = router;
