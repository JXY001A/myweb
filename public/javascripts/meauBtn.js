$(function() {
	$("#nav_meau").children().each(function() {
		$(this).on('click', function(e) {
			$(this).addClass("current").siblings().removeClass('current');
		});
	});
});