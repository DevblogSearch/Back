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
        <section>
        ${header}
        ${body}
        ${searchResult}
        </section>

        <div id = "footer">
          <a href="/oss_license.html">오픈소스 정보</a>
        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    </body>
    </html>
    `;
  },
  parseSearchResponse(searchResponse, q, start, numFound) {
    let searchPage = `
      <div class="row">
      <div class="col-md-5">
    `

    let searchResult = `
      <div class="search-container ">
      <ul class="search-container">
    `;
    for (res of searchResponse) {
      searchResult += `
      <li class="search-item clearfix">
        <div class="search-content text-left">
          <a href="${res.url}" target="_blank">
            <h3 class="search-result-title">${res.title}<h3>
          </a>
          <h4>
            <p>${res.content}</p>
          </h4>
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
    numFound = (numFound%10 > 0) ? numFound/10:numFound/10 ;
    if(start > 10){
      var i = start - ((start-1)%10) -1;
      searchPagination += `<li class="page-item"><a class="page-link" href="/search?q=${q}&start=${i}&n=10">◀</a></li> `;
    }
    var endFlag = false;
    for (var i = start - ((start-1)%10); i <= start - ((start-1)%10) + 9; i++) {
      if( i > numFound ){
        endFlag = true;
        break;
      }

      searchPagination += `<li class="page-item ` + ( i == start ? "active" : "" ) + `"><a class="page-link" href="/search?q=${q}&start=${i}&n=10">${i}</a></li>`;
    }
    if(!endFlag){
      var i = start - ((start-1)%10) +10;
      searchPagination += `<li class="page-item"><a class="page-link" href="/search?q=${q}&start=${i}&n=10">▶</a></li> `;
    }
    searchPagination += `
      </ul>
      </div>
    `;

    searchPage += searchResult + searchPagination;
    searchPage += `
      </div>
      </div>
    `;

    return searchPage;
  }
  
}
