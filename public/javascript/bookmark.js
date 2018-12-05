let currentPage = 1;
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
            $("#bookmark_list").append($(`
            <li class="bookmark col-xs-12 col-md-3 col-lg-offset-1 col-lg-3" onClick="location.href='${datas[d].url}'">
                <img class="bookmark_img" src="${datas[d].image}">
                <div class="bookmark_description">
                    <h4 id="title">${datas[d].title}</h4>
                    <p id="description">${datas[d].description}</p>
                    <button class = "delete_button">✖</button>
                </div>
            </li>`));
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

