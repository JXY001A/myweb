$(function() {
	// 默认制定的flowBox的宽度
	var width = 230;
	// 每一个flowBox的间距
	var space = 20;
	var outerWidth = width + space;
	// 得到防止flowBox 的外层盒子
	var waterContainer = $("#waterFlow-left");
	// 得到显示正在数据加载的动态图dom对象
	var showLoadDom = $('#showLoad');
	// 横向放置flowBox的个数
	var cells = 0;
	// 记录数据横向存放的位置
	var arrLeft = [];
	// 记录各个flowBox的纵向高度
	var arrTop = [];
	// 页码
	var pageNum = 0;
	// 初始化cells
	getCells();
	// 初始化位置数组
	initPositionArr();
	// 数据加载
	function loadData() {
		// 当开始加载数据的时候，解除滚动加载
		$(window).unbind('scroll');
		// 当图片开始加载的时候显示正在加载状态图
		showLoadDom.css({
			display: 'block'
		});
		// 使用get方法请求数据
		$.get('/blog/essays', {
			page: pageNum
		}, function(data) {
			if (data == 'finished') {
				$(window).unbind('scroll').bind('scroll',function(){
					var viewScreenTop = $(window).scrollTop() + $(window).innerHeight();
					var flowBoxHeight = waterContainer.offset().top + arrTop[getMinIndex()];
					$(showLoadDom.find('#imgBox')).css('display','none');
					showLoadDom.html('<div>兄弟别扯了，到底了</div>');
					if (viewScreenTop > flowBoxHeight) {
						showLoadDom.css('display','block');
					}else{
						showLoadDom.css('display','none');
					}
				});
			} else {
				waterContainer.append(data);
				// 得到本批次添加进来的flowBox
				var flowDoms = $('.flowBox' + pageNum);
				var len = flowDoms.size();
				flowDoms.each(function(index, el) {
					$(this).find('img').bind('load', function(event) {
						// 获取高度最低的位置索引
						var minIndex = getMinIndex();
						var boxHeight = $(el).outerHeight();
						// console.log(boxHeight);
						$(el).animate({
								left: arrLeft[minIndex],
								top: arrTop[minIndex]
							},
							'slow');
						arrTop[minIndex] += boxHeight + space;
						// 当加载进来的flowBoxs中的最后一个中的img标签将图片加载完成之后
						// 在开放滚动数据加载加载
						if (index == (len - 1)) {
							// 当数据加载完成之后再将滚动加载重新绑定到window对象上面
							$(window).bind('scroll', scrollLoadData);
							// 分别为每一批加载到的flowBox添加layer层事件，否则会影响之前已经加载好的
							// flowBoxs,同时这样更节省性能
							Layer.layerinit('.flowBox' + pageNum);
							// 当整个数据加载渲染完成后隐藏加载状态图
							showLoadDom.css('display','none');
						}
					});
				});
			}
		});
	}
	// 计算容器所能放置的盒子数
	function getCells() {
		cells = Math.floor(waterContainer.width() / outerWidth);
	}
	// 初始化位置记录的数组
	function initPositionArr() {
		for (var i = 0; i < cells; i += 1) {
			arrLeft.push(i * outerWidth);
			arrTop.push(0);
		}
	}
	// 返回位置数组中各个flowBox的纵向高度最短的索引
	function getMinIndex() {
		var value = arrTop[0];
		var index = 0;
		arrTop.forEach(function(obj, i) {
			if (obj < value) {
				value = obj;
				index = i;
			}
		});
		return index;
	}
	// 滚动加载实现
	function scrollLoadData(e) {
		var viewScreenTop = $(window).scrollTop() + $(window).innerHeight();
		var flowBoxHeight = waterContainer.offset().top + arrTop[getMinIndex()];
		if (viewScreenTop > flowBoxHeight) {
			pageNum++;
			loadData();
		}
	}
	// 默认首页进入时加载一次
	loadData();

});