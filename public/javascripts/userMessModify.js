$(function() {
	// 输入框显示影藏操作
	$('#modify').on('click', function(e) {
		$($(this).closest('.btn')).css('display', 'none');
		$('#save').css('display', 'block');

		$('#giveUp').on('click', function(e) {
			$('.messBox').find('.userMess').each(function(index) {
				$(this).css('display', 'block');
			});
			$('.messBox').find('.inputBox').each(function(index) {
				$(this).css('display', 'none');
			});
			$($(this).closest('.btn')).css('display', 'none');
			$('#modify').closest('.btn').css('display', 'block');
		});

		$('.messBox').find('.userMess').each(function(index) {
			$(this).css('display', 'none');
		});
		$('.messBox').find('.inputBox').each(function(index) {
			$(this).css('display', 'block');
		});
	});


	// 图片上传按钮控制
	$('.btnSelect').on('click', function() {
		$(this).addClass('select').siblings().removeClass('select');
		if ($(this).hasClass('netBtn')) {
			$('#netWorkInput').css('display', 'inline-block');
			$('#fileBox').css('display', 'none');
		} else {
			$('#netWorkInput').css('display', 'none');
			$('#fileBox').css('display', 'inline-block');
		}
	});

	// $('#form1').validator({
	// 	valid: function(form) {
	// 		form.submit();
	// 	}
	// });
});