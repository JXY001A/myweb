var btnAnimate = (function($) {

	function buttonAnimate(e) {
		// 每次执行之前清除上一次添加的.ripple对象
		$(".ripple").remove();
		// console.log(this);
		var posX = this.offset().left,
			posY = this.offset().top,
			buttonWidth = this.width(),
			buttonHeight = this.height();

		this.prepend("<span class='ripple'></span>");

		if (buttonWidth >= buttonHeight) {
			buttonHeight = buttonWidth;
		} else {
			buttonWidth = buttonHeight;
		}

		var x = e.pageX - posX - buttonWidth / 2;
		var y = e.pageY - posY - buttonHeight / 2;

		$(".ripple").css({
			width: buttonWidth,
			height: buttonHeight,
			top: y + 'px',
			left: x + 'px'
		}).addClass("rippleEffect");
	}
	return buttonAnimate;
})(jQuery);