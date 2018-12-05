let currentPage = 2;
let endOfPage = false;

function appendBookmark() {
  $.ajax({
    type: "GET",
    url: "/bookmark/list?page=" + currentPage,
    dataType: "json",
    success: function(datas) {
      console.log(datas);
      if (datas.length == 0) {
        endOfPage = true;
        return;
      }
      for (var d in datas) {
        if (datas[d].image[0] === '/') {
          datas[d].image = '/images/Chosung_on_grid_1.png';
        }
        $("#bookmark_list").append($(`
          <li class="bookmark col-xs-12 col-md-3 col-lg-offset-1 col-lg-3"  id=${d}>
            <div class="bookmark_content">
              <img src=${datas[d].image} height="200px" width="100%">
              <h3>
                <a href="${datas[d].url}">${datas[d].title}</a>
              </h3>
              <div class="bookmark_description">
                ${datas[d].description}
              </div> 
              <div class="bookmark_del">
                <button class = "delete_button" onclick="removeBookmarkElem('${datas[d].url}', ${d})">✖</button>
              </div>
            </div>
          </li>
        `));
      }
      currentPage += 1;
    }
  });
}

$(document).ready(function() {
    //appendBookmark();
});

$(window).scroll(function() {
  if (Math.floor($(window).scrollTop()) == $(document).height() - $(window).height()) {
    if (!endOfPage) {
      appendBookmark();
    }
  }
});

