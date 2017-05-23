$(function() {
	$('.deleteItem').each(function(index) {
		$(this).on('click', function(e) {
			var itemId = $(this).data('itemid');
			var that = $(this);
			$.ajax({
					url: '/admain/blog/delete',
					type: 'delete',
					dataType: 'json',
					data: {
						essayId: itemId
					},
				})
				.fail(function(data, status) {
					console.log('出错了');
				})
				.always(function(data, status) {
					$(that.closest('.item')).remove();
				});

		});
	});
	pageShow();

	function pageShow() {
		var btnA = $('#pageBox .pageItem').find('a');
		btnA.each(function(index) {
			$(this).on('click', function(e) {
				btnA.each(function(index) {
					$(this).removeClass('pageActive');
				});
				var page = $(this).data('page');
				var that = $(this);
				$.ajax({
					url: '/admain/blog/page',
					type: 'post',
					dataType: 'text',
					data: {
						page: page
					}
				})
				.fail(function(data,status){
					console.log(status);
				})
				.always(function(data,status){
					that.addClass('pageActive');
					$('tbody').html(data);
				});
			});
		});
	}
});