$(document).ready(function() {
  isMobile = false
  $(window).resize(function() {
    var windowWidth = $(window).width();
    if (windowWidth <= 768) {
      isMobile = true
    } else {
      isMobile = false
    }
  });

  $('#toggle-btn').click(function() {
    $('#sidebar').addClass("active");
    $("#overlay").css("display", "block");

    $('html, body').css({
      'overflow': 'hidden',
      'height': '100%'
    });

    $('#element').on('scroll touchmove mousewheel', function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
  })

  $('.close_button').click(function() {
    $('#sidebar').removeClass("active");
    $("#overlay").css("display", "none");

    $('html, body').css({'overflow': 'auto', 'height': '100%'});
    $('#element').off('scroll touchmove mousewheel');

  })

  $('#overlay').click(function() {
    $('#sidebar').removeClass("active");
    $("#overlay").css("display", "none");

    $('html, body').css({'overflow': 'auto', 'height': '100%'});
    $('#element').off('scroll touchmove mousewheel');
  })

  $(".button-like").click(function() {
    $(this).toggleClass("liked");
  });

  $(".mobile-heart").click(function() {
    $(this).toggleClass("active");
  });

  $(window).scroll(function() {
    if (Math.floor($(window).scrollTop()) == $(document).height() - $(window).height()) {

      $("#bookmark_list").append($('<li class="bookmark col-xs-12 col-md-3 col-lg-offset-1 col-lg-3"><div class="bookmark_content"></div><div class="bookmark_del"><button class = "delete_button">✖</button></div></li>'));

      $.ajax({
        type: "GET",
        url: "",
        dataType: "json",
        success: function(data) {

          $("#bookmark_list").append($('<li class="bookmark col-xs-12 col-md-3 col-lg-offset-1 col-lg-3"><div class="bookmark_content"></div><div class="bookmark_del"><button class = "delete_button">✖</button></div></li>'));

        }
      });
    }
  });

  $(function() {
    isSelect = false
    $("#inputSearch").keydown(function(event) {
      if (event.which === 38 || event.which === 40) {
        isSelect = true
      } else {
        isSelect = false
      }
    });
    $("#inputSearch").autocomplete({
      source: function(req, res) {
        $.ajax({
          url: "/autocomplete",
          data: {
            q: req.term
          },
          success: function(data) {
            if (isMobile) {
              data = data.slice(0, 5)
            }
            res($.map(data, function(n) {
              return n.split("").join(' ')
            }))
          }
        });
      },
      focus: function() {
        event.preventDefault();
      },
      search: function(event, ui) {
        isSelect = (typeof isSelect === "undefined") ? false : isSelect;
        if (isSelect) {
          return false;
        }
      },
      messages: {
        noResults: '',
        results: function() {}
      },
      appendTo: ".reactive-div"
    });
  });
  $('a.ui-state-focus').parent().css("background", "#eee");
});
