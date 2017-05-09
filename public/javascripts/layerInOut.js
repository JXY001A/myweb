var Layer = (function($) {

    function initLayer(className) {
        $(className).on('mouseenter mouseleave', function(e) {
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
        var w = $(obj).outerWidth();
        var h = $(obj).outerHeight();
        var xpos = w/2;
        var ypos = h/2;
        var oe = ev || event;
        var x = oe.offsetX;
        var y = oe.offsetY;
        var angle = Math.atan((x - xpos) / (y - ypos)) * 180 / Math.PI;
        if (angle > -45 && angle < 45 && y > ypos) {
            direct = 2;
        }
        if (angle > -45 && angle < 45 && y < ypos) {
            direct = 0;
        }
        if (((angle > -90 && angle < -45) || (angle > 45 && angle < 90)) && x > xpos) {
            direct = 1;
        }
        if (((angle > -90 && angle < -45) || (angle > 45 && angle < 90)) && x < xpos) {
            direct = 3;
        }

        return {
            width: w,
            height: h,
            dir: direct
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
    return { layerinit: initLayer }
})(jQuery);
