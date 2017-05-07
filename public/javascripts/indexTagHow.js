var tagShow = (function($) {
    function tagShow() {
        var Wrap = $("#wrap");
        var tags = Wrap.children('.tagItem');
        var len = tags.size();
        var deg = 360 / len;
        var xDeg = 0;
        var mx = 0,
            my = 0;
        var Timer;
        tags.each(function(i) {
            $(this).css({
                transition: 'transform 1.5s ' + (len - i) * 0.2 + 's',
                transform: 'rotateY(' + i * deg + 'deg) translateZ(300px)'
            });
        });

        $(document).mousedown(function(e) {
            clearInterval(Timer);
            var x1 = e.clientX;
            var y1 = e.clientY;
            $(this).bind('mousemove', function(e) {
                mx = e.clientX - x1;
                my = e.clientY - y1;
                x1 = e.clientX;
                y1 = e.clientY;
                xDeg += mx * 0.2;
                Wrap.css('transform', "perspective(800px) rotateX(-10deg) rotateY(" + xDeg + "deg)");
            });

        }).mouseup(function(e) {
            $(this).unbind('mousemove');
            Timer = setInterval(function() {
                mx *= .95;
                my *= .95;
                xDeg += mx * 0.2;
                Wrap.css('transform', "perspective(800px) rotateX(-10deg) rotateY(" + xDeg + "deg)");
            }, 30)
        });
    }
    // 将tagShow方法绑定到window对象上
    return tagShow;
})(jQuery)
