const qs = require('querystring');
module.exports = {

  HTML(title, local_library, body, header, searchResult = "No Result") {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title> ${title} </title>

      <!--Global Javascript-->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

      <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
      <script src="/javascript/plugins/backbone/underscore-min.js"></script>
      <script src="/javascript/plugins/backbone/backbone-min.js"></script>
      <script src="/javascript/plugins/backbone/backbone.marionette.min.js"></script>

      <!--END Global Javascript-->

      <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->

      <!--Global CSS-->
      <link href="/stylesheet/components-rounded.min.css" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
      <link href="/stylesheet/common.css" rel="stylesheet" type="text/css" />
      <link href="/stylesheet/like.css" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" href= "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <!--END Global CSS-->

      <link href="/stylesheet/bookmark.css" rel="stylesheet" type="text/css" />


      ${local_library}

    </head>
    <body>

    <section>
    ${header}
    ${body}
    ${searchResult}
    </section>

    <div id = "footer">
      <a href="/oss_license.html">오픈소스 정보</a>
    </div>

    </body>
    <script src="/javascript/common.js"></script>
    </html>
    `;
  },
  parseSearchResponse(searchResponse, q, start, numFound, user, likes) {
    let searchPage = `
      <div class="row article">
      <div class="col-xs-12 col-sm-12 col-md-7 col-md-offset-1 col-lg-6 col-lg-offset-1" style = "min-height : 845px;" >
    `

    let searchResult = `
      <div class="search-container ">
      <ul class="search-container">
    `;
    let likeButton = '';
    for (res of searchResponse) {

      if (!!user) {
        likeButton = `<button class = "button-like visible-lg-block visible-md-block" onclick="likeEvent(${user.id}, '${res.url}', this)"><i class="fa fa-heart"></i><span>like</span></button>
        <button class = "mobile-heart visible-xs-block visible-sm-block" onclick="likeEvent(${user.id}, '${res.url}', this)"><i class="fa fa-heart"></i><span></span></button>`;
      }
      
      for (like of likes) {
        if (res.url === like.url) {
          likeButton = `<button class = "button-like visible-lg-block visible-md-block liked" onclick="likeEvent(${user.id}, '${res.url}', this)"><i class="fa fa-heart"></i><span>like</span></button>
         <button class = "mobile-heart visible-xs-block visible-sm-block active" onclick="likeEvent(${user.id}, '${res.url}', this)"><i class="fa fa-heart"></i><span></span></button>`;
        }
      }

      searchResult += `
      <li class="search-item clearfix">
        <div class="search-content text-left">
          <a href="${res.url}" ping="https://hangoole.com/events/ping?url=${qs.escape(res.url)}&blog_id=${res.blog_id}">
            <h3 class="search-result-title">${res.title}<h3>
          </a>

          <h4>
            <p>${res.content}</p>
          </h4>
        </div>
        <div class = "like-content">
          ${likeButton}
        </div>
      </li>
      `;
    }
    searchResult += `
      </ul>
      </div>
    `

    let searchPagination = `
      <div class="search-pagination">
      <ul class="pagination">
    `;
    numFound = Math.ceil(numFound/10);
    if(start > 5){
      var i = start - ((start-1)%5) -1;
      searchPagination += `<li class="page-item"><a class="page-link" href="/search?q=${q}&start=${i}&n=5">◀</a></li> `;
    }
    var endFlag = false;
    for (var i = start - ((start-1)%5); i <= start - ((start-1)%5) + 4; i++) {
      if (i > numFound ) {
        endFlag = true;
        break;
      }

      searchPagination += `<li class="page-item ` + ( i == start ? "active" : "" ) + `"><a class="page-link" href="/search?q=${q}&start=${i}&n=10">${i}</a></li>`;
    }
    if (!endFlag) {
      var i = start - ((start-1)%5) +5;
      searchPagination += `<li class="page-item"><a class="page-link" href="/search?q=${q}&start=${i}&n=5">▶</a></li> `;
    }
    searchPagination += `
      </ul>
      </div>
    `;

    searchPage += searchResult + searchPagination;
    searchPage += `
      </div>
      <div id = "search-page-footer">
      <a href="/oss_license.html">오픈소스 정보</a>
      </div>
      </div>
    `;

    return searchPage;
  }


}
