module.exports = {
  HTML(title, body, authStatusUI='<a href="/auth/login">login</a>', searchResult="No Result") {
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
      ${authStatusUI}
      ${body}
      ${searchResult}
    </body>
    </html>
    `;
  },
  parseSearchResponse(searchResponse) {
    let searchResult = '';
    for (res of searchResponse) {
      searchResult += `<div><ul>
      <li>url: ${res.url}</li>
      <li>title: ${res.title}</li>
      <li>content: ${res.content}</li>`
      searchResult += '</ul></div>'
    }
    return searchResult;
  }
}