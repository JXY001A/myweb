$(function() {
	$('.showMore').each(function(index) {
		$(this).bind('click', function(e) {
			showItems($(this));
		});
	});

	function hiddenItems(dom) {
		dom.siblings('.list').css({
			height: 5 * 37
		});
		dom.html('查看更多<i class="iconfont icon-up">');
		dom.unbind('click').bind('click',function(){
			showItems(dom);
		});
	}

	function showItems(dom) {
		var num = dom.siblings('.list').find('li').size();
		dom.siblings('.list').css({
			height: num * 37
		});
		dom.html("收起<i class='iconfont icon-shouqi'></i>");
		dom.unbind('click');
		dom.unbind('click').bind('click',function(){
			hiddenItems(dom);
		});
	}

	// 点击之后的动画特效代码
	$('#content .classList .list .item').each(function(){
		$(this).bind('click',function(e){
			btnAnimate.call($(this),e);
		})
	});

	// 菜单按钮选中设置
	$('#categoryList').addClass('current').siblings().removeClass('current');
});