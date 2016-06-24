$(function(){
    var $body=$("body");
    // panel
    $("#panelSwitch").on("touchstart",function(){
        if($body.hasClass("panel-active")){
            $body.removeClass("panel-active");
            $body.off("touchmove",disableScroll);
        } else{
            $body.addClass("panel-active");
            $body.on("touchmove",disableScroll);
        }
    });

    // popup page
    $("#popup-page").on("touchstart",function(){
        $(".popup-page").addClass("active");
    });

    $("#popup-page-close").on("touchstart",function(){
        $(".popup-page").removeClass("active");
    });

    // pop over
    var $overlay = $('#overlay');

    function modalHidden($ele) {
        $ele.removeClass('active');
        $ele.one('transitionEnd webkitTransitionEnd oTransitionEnd',function(){
            $ele.css({"display": "none"});
            $overlay.removeClass('active');
        });
    }

    $('#popup-over').on("touchstart",function(){
        var offset = $(this).offset();
        $overlay.addClass('active');
        var $whichPopup = $('.popup-over');
        $whichPopup.css("display", "block").animate({"left": offset.left+30, "top": offset.top+50},100,
            function(){
                $(this).addClass('active');
            });

        $overlay.one("touchstart",function(){
            modalHidden($whichPopup);
        });
        $whichPopup.one("touchstart",function(e){
            e.stopPropagation();
        });
    });

    function disableScroll(e){
        e.preventDefault();
    }

    //page change
    var $main = $('#pageSection'),
        $back = $('.icon-back');

    function pageSlideOver(){
        $('.page-out').on('transitionEnd webkitTransitionEnd oTransitionEnd', function(){
            $(this).removeClass('page-out');
        });
        $('.page-in').on('transitionEnd webkitTransitionEnd oTransitionEnd', function(){
            $(this).removeClass('page-in');
        });
    }

    $main.on('touchstart', '.nav-links li', function(e){

        var $pageTo = $('.'+$(this).data("page"));

        $main.removeClass('page-active').addClass('page-prev page-out');
        $pageTo.removeClass('page-next').addClass('page-active page-in');

        pageSlideOver();
        $back.css({display:"block"}).data({"page":"page-index"});

    });

    $back.on('touchstart',function() {
        $('.page-active').removeClass('page-active').addClass('page-next page-out');
        $('.' + $(this).data('page')).removeClass('page-prev').addClass('page-active page-in');
        pageSlideOver();
        $back.css({display: "none"});
    });
});