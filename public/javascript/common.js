$(document).ready(function () {
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