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
        <script src="assets/pages/plugins/jquery/jquery-min.js"></script>
        <script src="assets/pages/plugins/backbone/underscore-min.js"></script>
        <script src="assets/pages/plugins/backbone/backbone-min.js"></script>
        <script src="assets/pages/plugins/backbone/backbone.marionette.min.js"></script>
        <!--END Global Javascript-->

        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

        <link href="bootcss/components-rounded.css" rel="stylesheet" type="text/css" />
        <link href="bootcss/components-rounded.min.css" rel="stylesheet" type="text/css" />

        <link href="bootcss/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="bootcss/bootstrap.min.css" rel="stylesheet" type="text/css" />

        <link href="bootcss/search.css" rel="stylesheet" type="text/css" />
        <link href="bootcss/search.min.css" rel="stylesheet" type="text/css" />

        <link href="bootcss/common.css" rel="stylesheet" type="text/css" />

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
                    <img id="logo-img" src="assets/pages/image/aaa1.png">
                </a>
            </div>
        </div>
        <div class="input-group">
            <form action="http://ec2-52-78-115-199.ap-northeast-2.compute.amazonaws.com/search" method="GET" id="form1">
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
    <script type="text/javascript" src="js/bootstrap.js"></script>
    </body>
    </html>
    `;
  }
}