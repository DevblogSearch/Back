function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

$(document).ready(function() {
  $(window).scroll(function() {
    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()) {

      $("#bookmark_list").append($('<li class="bookmark col-xs-10 col-md-3 col-lg-2"><div class="bookmark_content"></div><div class="bookmark_del"><button class = "delete_button">✖</button></div></li>'));

      $.ajax({
        type: "GET",
        url: "",
        dataType: "json",
        success: function(data) {

          $("#bookmark_list").append($('<li class="bookmark col-xs-10 col-sm-5 col-md-4 col-lg-4"><div class="bookmark_content"></div><div class="bookmark_del"><button class = "delete_button">✖</button></div></li>'));

        }
      });

    }
  });
});
