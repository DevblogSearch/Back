const express = require('express');
const template = require('../lib/template');
const auth = require('../lib/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "나랏말싸미_main";
  let header = `
    <div id="login-main">
    ` + auth.StatusUI(req,res) + `
    </div>
  `;
  let body = `
    <div class="content center col-sm-4 col-sm-offset-4" id="main">
    <div id="area-logo">
      <div>
        <a href="#">
          <img id="logo-img" src="/images/king_sejong.jpg">
        </a>
      </div>
    </div>
    <div class="input-group">
    <form action="/search" method="GET" id="form1">
        <input type = "text" class="form-control" placeholder="검색어를 입력하세요" style="height: 44px" autocomplete="off" maxlength="100" name="q">
        <input type="hidden" name="start" value="1">
        <input type="hidden" name="n" value="10">
      </form>
      <span class="input-group-btn">
        <button form="form1" class="btn blue uppercase bold" style="height: 44px">검색</button>
      </span>
    </div>
    </div>
    `;
  let html = template.HTML(title, body, header,"");
  res.send(html);
});

module.exports = router;
