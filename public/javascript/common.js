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

    $(function(){
        $("#inputSearch").autocomplete({
            source : function( req, res){
                $.ajax({
                    url: "/autocomplete",
                    data: {
                        q: req.term
                    },
                    success: function(data){
                        res(data);
                    }
                });
            },
            focus: function(){
                event.preventDefault();
            },
            search:function(event,ui){
                var isSelect = $(this).attr('isSelect');
                isSelect = (typeof isSelect === "undefined") ? 0 : isSelect;
                if (isSelect == 1) {        
                    console.log('선택 된 직후이니 처리 안함.');
                    return false;      
                }
            },
            select:function(event,ui){
                $(this).attr('isSelect', 1);
                setTimeout(function(obj){        
                    $(obj).attr('isSelect', 0);
                }, 500, this );
                $(this).val('');
                return false;
            },
            open: function() {
                $( this ).autocomplete("widget").width("323px");
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            },
            messages: {
                noResults: '',
                results: function(){}
            }
        });
    });
    $('a.ui-state-focus').parent().css("background","#eee");
});


function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementsByClassName("overlay").fadeIn();
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('active');
  document.getElementsByClassName( "overlay" ).fadeOut();
}
