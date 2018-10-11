module.exports = {
  HTML(title, body, header, searchResult = "No Result") {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title> ${title} </title>

        <!--Global Javascript-->
        <script src="/javascript/plugins/jquery/jquery-min.js"></script>
        <script src="/javascript/plugins/backbone/underscore-min.js"></script>
        <script src="/javascript/plugins/backbone/backbone-min.js"></script>
        <script src="/javascript/plugins/backbone/backbone.marionette.min.js"></script>
        <!--END Global Javascript-->

        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

        <link href="/stylesheet/components-rounded.min.css" rel="stylesheet" type="text/css" />
        <link href="/stylesheet/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/stylesheet/search.min.css" rel="stylesheet" type="text/css" />
        <link href="/stylesheet/common.css" rel="stylesheet" type="text/css" />

    </head>
    <body>
        ${header}
        ${body}
        ${searchResult}
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    </body>
    </html>
    `;
  },
  parseSearchResponse(searchResponse) {
    let searchResult = '';
    for (res of searchResponse) {
      searchResult += `<li class="search-item clearfix">
        <div class="search-content text-left">
          <a href="${res.url}">
            <h3 class="search-result-title">${res.title}<h3>
          </a>
          <h4>
            <p>${res.content}</p>
          </h4>
        </div>
      </li>`;
    }
    return searchResult;
  }
  
}