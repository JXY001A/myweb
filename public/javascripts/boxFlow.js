$(function() {
	// 按钮切换效果
	var width = 230;
	var space = 20;
	var outerWidth = width + space;
	var waterContainer = $("#waterFlow-left");
	var cells = 0;
	// 记录数据横向存放的位置
	var arrLeft = [];
	// 记录各个flowBox的纵向高度
	var arrTop = [];
	// 数据页
	var pageNum = 0;
	var index = 0;
	// 初始化cells
	getCells();
	// 初始化位置数组
	initPositionArr();
	// 数据加载
	function loadData() {
		$.get('/blog/essays', {
			page: pageNum
		}, function(data) {
			waterContainer.append(data);
			// document.getElementById('waterFlow-left').innerHTML+=data;
			// data.forEach(function(obj, i) {
			// 	index = i;
			// 	waterContainer.append("<div class='flowBox' id=flowBox" + pageNum + i + ">" +
			// 		"                    <div class='imgBox'>" +
			// 		"                        <img src='" + obj.faceImg + "'>" +
			// 		"                    </div>" +
			// 		"                    <div class='itemTitlie'>" +
			// 		"                        <a href='javascript:void(0)'>" + obj.essayTitli + "</a>" +
			// 		"                    </div>" +
			// 		"                    <div class='itemAuthor'>" +
			// 		"                        Author:" +
			// 		"                        <a href='javascript:void(0);'>JXY001A</a>" +
			// 		"                    </div>" +
			// 		"                    <div class='itemContent'>" +
			// 		"                        <div class='itemDesc'>简介：</div>" +
			// 		"                        <p>" + obj.desc +
			// 		"                        </p>" +
			// 		"                    </div>" +
			// 		"                    <div class='layer'>" +
			// 		"                        <ul>" +
			// 		"                            <li>" +
			// 		"                                <i class='iconfont icon-weibiaoti1' ></i>" +
			// 		"                                <a href='javascript:void(0);' style='color: #ae0b9a;'>" + obj.essayTitli +
			// 		"                                </a>" +
			// 		"                            </li>" +
			// 		"                            <li>" +
			// 		"                                <i class='iconfont icon-articleUser' ></i>" +
			// 		"                                <a href='javascript:void(0);'>" +
			// 		"                                    JXY001A" +
			// 		"                                </a>" +
			// 		"                            </li>" +
			// 		"                            <li>" +
			// 		"                                <i class='iconfont icon-chakan' ></i>" +
			// 		"                                <a href='javascript:void(0);'>" +
			// 		"                                    (10)" +
			// 		"                                </a>" +
			// 		"                            </li>" +
			// 		"                            <li>" +
			// 		"                                <i class='iconfont icon-dianzan' ></i>" +
			// 		"                                <a href='javascript:void(0);'>" +
			// 		"                                    (20)" +
			// 		"                                </a>" +
			// 		"                            </li>" +
			// 		"                            <li>" +
			// 		"                                <i class='iconfont icon-zhizhulaiyuan' ></i>" +
			// 		"                                <a href='javascript:void(0);' style='color: #ae0b9a;'>" +
			// 		"                                    www.asdf.com" +
			// 		"                                </a>" +
			// 		"                            </li>" +
			// 		"                            <li>" +
			// 		"                                <i class='iconfont icon-xiangqing' ></i>" +
			// 		"                                <a href='javascript:void(0);' style='color:#ae0b9a;'>" +
			// 		"                                    详情" +
			// 		"                                </a>" +
			// 		"                            </li>" +
			// 		"                            <li>" +
			// 		"                                <i class='iconfont icon-pinglun' ></i>" +
			// 		"                                <a href='javascript:void(0);' >" +
			// 		"                                    (5)" +
			// 		"                                </a>" +
			// 		"                            </li>" +
			// 		"                        </ul>" +
			// 		"                    </div>" +
			// 		"                </div");
			// });
			// 得到刚被添加的Dom元素
			var boxDom = $('#flowBox' + pageNum + index);
			// 判断图片是否加载完成（加载完成则执行毁掉函数）
			boxDom.find('img').bind('load', function(event) {
				// 获取高度最低的位置索引
				var minIndex = getMinIndex();
				var boxHeight = $(boxDom).outerHeight();
				// console.log(boxHeight);
				boxDom.animate({
					left: arrLeft[minIndex],
					top: arrTop[minIndex]},
					'slow', function() {
					/* stuff to do after animation is complete */
				});
				arrTop[minIndex]+=boxHeight + space;
			});;
			Layer.layerinit();
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
	loadData();

	// 滚动加载
	$(window).on('scroll' , function (e){
		var viewScreenTop = $(window).scrollTop()+$(window).innerHeight();
		var flowBoxHeight = waterContainer.offset().top + arrTop[getMinIndex()];
		if (viewScreenTop > flowBoxHeight) {
			pageNum+=1;
			loadData();
		}
	});

});