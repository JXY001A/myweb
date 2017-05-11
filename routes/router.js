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
	// 加载webGL静态资源处理模块
	var Resourse = require('../app/controller/resourse.js');
	// 博客l路基处理模块控制
	var Blog = require('../app/controller/blog.js');
	// 用户模块
	var User = require('../app/controller/user.js');

	// 首页控制逻辑
	app.get('/',Index.index);

	// 博客路由控制
	app.get('/blog/index' , Blog.blogIndex);
	app.get('/blog/essays' , Blog.blogEssays);
	app.get('/blog/:id' , Blog.essayShow);
	app.get('/blog/essay/Uplaod', Blog.essayUpload);

	// 用户路由控制
	app.get('/user/signIn' , User.signIn);
	app.get('/user/signUp' , User.signUp);

	// webGL静态资源加载路径
	app.get('/webGL/:name', Resourse.image);

}
