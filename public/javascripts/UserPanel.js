// 用户操作面板控制代码
$(function() {
	$('#userPanel').css('height', $(window).height());
	// 为点击按钮添加点击效果
	$('.btnBox').each(function(i){
		$(this).on('click',function(e){
			btnAnimate.call($($(this).closest('.userHandleList')[0]),e);
		});
	});
	$('#signUser').on('click', function(e) {
		$('#userPanel').addClass('clickShow');
		// 阻止冒泡
		e.stopPropagation();
	});
	$('#rightCom').on('click',function(e){
		// e.preventDefault();阻止dom对象默认点击后的行为
		$('#userPanel').removeClass('clickShow');
		// 阻止冒泡
		e.stopPropagation();
	});
});