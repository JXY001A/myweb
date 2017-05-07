var Layer = (function($) {

    function initLayer() {
        $('.flowBox').on('mouseenter mouseleave', function(e) {
            var obj = getDirect(e, this);
            var divLayer = $(this).find('.layer')[0];
            if (e.type == 'mouseenter') {
                mouseEnterMove(obj, $(divLayer));
            } else {
                mouseLeaveMove(obj, $(divLayer));
            }
        });
    }

    function getDirect(ev, obj) {

        var w = obj.offsetWidth;
        var h = obj.offsetHeight;
        var x = (ev.pageX - obj.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (ev.pageY - obj.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        
        return {
            width: w,
            height: h,
            dir: direction
        };

    }

    function mouseEnterMove(obj, divLayer) {

        switch (obj.dir) {
            case 0:
                divLayer.css({
                    'top': -obj.height,
                    'left': 0
                }).stop(true, true).animate({
                    'top': 0
                }, 'fast');
                break;
            case 1:
                divLayer.css({
                    'left': obj.width,
                    'top': 0
                }).stop(true, true).animate({
                    'left': 0
                }, 'fast');
                break;
            case 2:
                divLayer.css({
                    'top': obj.height,
                    'left': 0
                }).stop(true, true).animate({
                    'top': 0
                }, 'fast');
                break;
            case 3:
                divLayer.css({
                    'left': -obj.width,
                    'top': 0
                }).stop(true, true).animate({
                    'left': 0
                }, 'fast');
                break;
        }

    }

    function mouseLeaveMove(obj, divLayer) {

        switch (obj.dir) {
            case 2:
                divLayer.stop(true, true).animate({
                    "top": obj.height
                }, "fast");
                break;
            case 0:
                divLayer.stop(true, true).animate({
                    "top": -obj.height
                }, "fast");
                break;
            case 1:
                divLayer.stop(true, true).animate({
                    "left": obj.width
                }, "fast");
                break;
            case 3:
                divLayer.stop(true, true).animate({
                    "left": -obj.width
                }, "fast");
                break;
        }
    }
    // 自动调用初始化
    initLayer();
    return {
        initLayer:initLayer
    };
})(jQuery);