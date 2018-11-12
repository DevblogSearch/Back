$(document).ready(function () {
    $(function(){
        $("#inputSearch").autocomplete({
            source : function( req, res){
                $.ajax({
                    url: "http://ec2-52-78-115-199.ap-northeast-2.compute.amazonaws.com/autocomplete",
                    data: {
                        q: req.term
                    },
                    success: function(data){
                        res(data);
                    }
                });
            },
            open: function() {
                $( this ).autocomplete("widget").width("323px");
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }

        });
    });
    
});