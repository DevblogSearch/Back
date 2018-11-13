$(document).ready(function() {

  var page = 1;

  console.log(Math.ceil($(window).scrollTop()));
  console.log($(window).height());
  console.log($(document).height());

  $(window).scroll(function() {
    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()) {
      console.log(++page);

      $("#bookmark_list").append($('<li class="bookmark"><div class="bookmark_content"></div><div class="bookmark_del"><button class = "delete_button">✖</button></div></li>'));

      $.ajax({
        type: "GET",
        url: "",
        dataType: "json",
        success: function(data) {

          $("#bookmark_list").append($('<li class="bookmark"><div class="bookmark_content"></div><div class="bookmark_del"><button class = "delete_button">✖</button></div></li>'));

        }
      });

    }
  });
});
