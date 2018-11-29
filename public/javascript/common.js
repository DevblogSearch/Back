$(document).ready(function () {

  $('#toggle-btn').click(function () {
     $('#sidebar').addClass("active");
     $("#overlay").css("display" ,"block");
  })

  $('.close_button').click(function () {
     $('#sidebar').removeClass("active");
     $("#overlay").css("display" ,"none");
  })

  $('#overlay').click(function () {
     $('#sidebar').removeClass("active");
     $("#overlay").css("display" ,"none");
  })

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

    $(function(){
        isSelect = false
        $("#inputSearch").keydown(function(event){
            if(event.which === 38 || event.which === 40){
                isSelect = true
            }
            else{
                isSelect = false
            }
        });
        $("#inputSearch").autocomplete({
            source : function( req, res){
                $.ajax({
                    url: "/autocomplete",
                    data: {
                        q: req.term
                    },
                    success: function(data){
                        res($.map(data,function(n){
                            return n.split("").join(' ')
                        }))
                    }
                });
            },
            focus: function(){
                event.preventDefault();
            },
            search:function(event,ui){
                isSelect = (typeof isSelect === "undefined") ? false : isSelect;
                if (isSelect) {
                    return false;
                }
            },
            messages: {
                noResults: '',
                results: function(){}
            },
            appendTo:".reactive-div"
        });
    });
    $('a.ui-state-focus').parent().css("background","#eee");
});
