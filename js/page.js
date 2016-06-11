$(function(){
    var $body=$("body");

    $("#panelSwitch").on("tap",function(){
        if($body.hasClass("panel-active")){
            $body.removeClass("panel-active");
            $body.off("touchmove",disableScroll);
        } else{
            $body.addClass("panel-active");
            $body.on("touchmove",disableScroll);
        }
    });

    $("#popup-page").on("tap",function(){
        $(".popup-page").addClass("active");
    });

    $("#popup-page-close").on("tap",function(){
        $(".popup-page").removeClass("active");
    });

    // pop over
    var $overlay = $('#overlay');

    function modalHidden($ele) {
        $ele.removeClass('active');
        $ele.one('transitionend',function(){
            $ele.css({"display": "none"});
            $overlay.removeClass('active');
        });
    }

    $('#popup-over').on("tap",function(){
        var offset = $(this).offset();
        $overlay.addClass('active');
        var $whichPopup = $('.popup-over');
        $whichPopup.animate({"display": "block", "left": offset.left+30, "top": offset.top+50},100,
            function(){
                $(this).addClass('active');
            });

        $overlay.one("tap",function(){
            modalHidden($whichPopup);
        });
        $whichPopup.one("tap",function(e){
            e.stopPropagation();
        });
    });

    function disableScroll(e){
        e.preventDefault();
    }

    var $main = $('#pageSection'),
        $back = $('.icon-back');

    function pageSlideOver(){
        $('.page-out').live('transitionend', function(){
            $(this).removeClass('page-out');
        });
        $('.page-in').live('transitionend', function(){
            $(this).removeClass('page-in');
        });
    }

    $main.on('tap', '.nav-links li', function(e){

        var $pageTo = $('.'+$(this).data("page"));

        $main.removeClass('page-active').addClass('page-prev page-out');
        $pageTo.removeClass('page-next').addClass('page-active page-in');

        pageSlideOver();
        $back.css({display:"block"}).data({"page":"page-index"});

    });

    $back.on('tap',function() {
        $('.page-active').removeClass('page-active').addClass('page-next page-out');
        $('.' + $(this).data('page')).removeClass('page-prev').addClass('page-active page-in');
        pageSlideOver();
        $back.css({display: "none"});
    });
});