module.exports = {
  HTML(title, authStatusUI='<a href="/auth/login">login</a>') {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title> ${title} </title>

        <!--Global Javascript-->
        <script src="../Front/assets/pages/plugins/jquery/jquery-min.js"></script>
        <script src="../Front/assets/pages/plugins/backbone/underscore-min.js"></script>
        <script src="../Front/assets/pages/plugins/backbone/backbone-min.js"></script>
        <script src="../Front/assets/pages/plugins/backbone/backbone.marionette.min.js"></script>
        <!--END Global Javascript-->

        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

        <link href="../Front/bootcss/components-rounded.css" rel="stylesheet" type="text/css" />
        <link href="../Front/bootcss/components-rounded.min.css" rel="stylesheet" type="text/css" />

        <link href="../Front/bootcss/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="../Front/bootcss/bootstrap.min.css" rel="stylesheet" type="text/css" />

        <link href="../Front/bootcss/search.css" rel="stylesheet" type="text/css" />
        <link href="../Front/bootcss/search.min.css" rel="stylesheet" type="text/css" />

        <link href="../Front/bootcss/common.css" rel="stylesheet" type="text/css" />

    </head>
    <body>
        <div id="login-main">
            ${authStatusUI}
            <button class="btn blue uppercase bold">로그인</button>
            <button class="btn blue uppercase bold">회원가입</button><!--템플릿으로 해줘야 하는가? 로그인 되었을때, 안되었을때-->
        </div>
    <div class="content center col-sm-4 col-sm-offset-4" id="main">
        <div id="area-logo">
            <div>
                <a href="#">
                    <img id="logo-img" src="../Front/assets/pages/image/aaa1.png">
                </a>
            </div>
        </div>
        <div class="input-group">
            <form action="/search" method="GET" id="form1">
                <input type = "text" class="form-control" placeholder="검색어를 입력하세요" style="height: 44px" name="q">
                <input type="hidden" name="start" value="0"><!--0부터 시작?-->
                <input type="hidden" name="n" value="10">
            </form>
            <span class="input-group-btn">
                <button form="form1" class="btn blue uppercase bold" style="height: 44px">검색</button>
            </span>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    </body>
    </html>
    `;
  }
}