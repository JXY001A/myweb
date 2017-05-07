/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-05-07 11:13:16
 * @desc:    (路由控制)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
module.exports = function(app) {
	// 首页逻辑处理模块
	var Index = require('../app/controller/index.js');
	// 加载静态资源处理里模块
	var Resourse = require('../app/controller/resourse.js');
	// 首页控制逻辑
	app.get('/',Index.index);





	// 静态模块资源
	app.get('/webGL/img1',Resourse.image1);
	app.get('/webGL/img2',Resourse.image2);
	app.get('/webGL/img3',Resourse.image3);
	app.get('/webGL/img4',Resourse.image4);

}
