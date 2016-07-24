requirejs.config({
    baseUrl:"node_modules/",
    paths:{
        jquery:"jquery/dist/jquery"
    }

});

requirejs(['jquery'],function($){
      (function(scope,$){
        var _default={
            name:'Scroller',
            effect:500
        };
        var _prototype={
            _init:function(ops){
                this.options= $.extend(_default,ops);
                this._$Element=$(this);
                this._$Wrapper=this._$Element.find('.scroller-wrapper');
                this.index=0;
                this.length=this._$Wrapper.find("li").length-1;
                this.lock=false;
            },
            _handle:function(){
                var _self=this;
                this._$Element.on("mousewheel",function(e) {
                    if (_self.lock)
                        return;
                    if (e.originalEvent.wheelDelta < 0 && _self.index < _self.length) {
                        _self.index++;
                    } else if (e.originalEvent.wheelDelta > 0 && _self.index > 0) {
                        _self.index--;
                    }
                    //  console.log(_self.index)
                    _self.scroll();
                });
            },
            scroll:function(){
                var _self=this;
                if (_self.lock)
                    return;
                _self.lock = true;
                _self._trigger('start',[_self.index]);
                _self._$Wrapper.stop().animate({top: '-' + _self.index + '00%'}, _self.options.effect, function () {
                    _self.lock = false;
                    _self._trigger('end');
                });
            },
            next:function(){
                this.index++;
                this.index=this.index>this.length?this.length:this.index;
                this.scroll();
            },
            prev:function(){
                this.index--;
                this.index=this.index<0?0:this.index;
                this.scroll();
            },
            _trigger:function(event,args){
                this._$Element.trigger(event,args);
            },
            bind:function(event,callback){
                this._$Element.on(event,callback);
            }
        };
        $.fn.scroller=function(ops){
            $.extend(this,_prototype);
            this._init(ops);
            this._handle();
            this._$Element.data(this.options.name,this);

        }
    })(window,$);

    $(function(){
        $("#scroller").scroller({name:'test'});
        var scroller=$("#scroller").data('test');
        scroller.bind('start',function(event,index){
            console.log(index);
        });
        scroller.bind('end',function(){
            console.log('end');
        });

    });
});

