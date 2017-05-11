$(function() {
	// 默认制定的flowBox的宽度
	var width = 230;
	// 每一个flowBox的间距(默认指定值)
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
				// 数据加载完成后的处理
				$(window).unbind('scroll').bind('scroll', function() {
					var viewScreenTop = $(window).scrollTop() + $(window).innerHeight();
					var flowBoxHeight = waterContainer.offset().top + arrTop[getMinIndex()];
					$(showLoadDom.find('#imgBox')).css('display', 'none');
					showLoadDom.html('<div>兄弟别扯了，到底了</div>');
					// 加30的目的是为了防止在单列的情况下可视区域的高度
					// 最大只与flowBoxHeight相等，使得结束句不能正常展示的处理
					if (viewScreenTop + 30 > flowBoxHeight) {
						showLoadDom.css('display', 'block');
					} else {
						showLoadDom.css('display', 'none');
					}
				});
			} else {
				// 将加载到的数据填充到flowBox的外层盒子中
				waterContainer.append(data);
				// 得到本批次添加进来的flowBox
				var flowDoms = $('.flowBox' + pageNum);
				var len = flowDoms.size();
				flowDoms.each(function(index, el) {
					$(this).find('img').bind('load', function(event) {
						// 获取高度最低的位置索引
						var minIndex = getMinIndex();
						var boxHeight = $(el).outerHeight();
						$(el).animate({
								left: arrLeft[minIndex],
								top: arrTop[minIndex]
							},
							'slow');
						// 更新记录高度的数组
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
							showLoadDom.css('display', 'none');
						}
					});
				});
			}
		});
	}
	// 计算容器所能放置的盒子数
	function getCells() {
		// 如果屏幕宽度小于790时，flowBox每行只设置1个
		if ($(window).width() < 790) {
			cells = 1;
		} else {
			// 其他情况依据正常情况处理
			cells = Math.floor(waterContainer.width() / outerWidth);
		}
		return cells;
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
		if (viewScreenTop + 30 > flowBoxHeight) {
			pageNum++;
			loadData();
		}
	}
	// 窗口改变时重新调整flowBox的结构方法
	function flowBoxAdopt() {
		var flowBoxs = $('.flowBox');
		flowBoxs.each(function(index, el) {
			var minIndex = getMinIndex();
			var boxHeight = $(el).outerHeight();
			// console.log(boxHeight);
			$(el).animate({
					left: arrLeft[minIndex],
					top: arrTop[minIndex]
				},
				'slow');
			arrTop[minIndex] += boxHeight + space;
		});
	}

	// 窗口大小改变时调整结构
	$(window).bind('resize', function(event) {
		// 判断有没有必要调整机构（cells不变不调整，反之亦然）
		var cellsOld = cells;
		cells = getCells();
		if (cells == cellsOld) {

		} else {
			initPositionArr();
			flowBoxAdopt();
		}
	});

	// 默认首页进入时加载一次
	loadData();

});