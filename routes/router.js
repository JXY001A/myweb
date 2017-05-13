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

	/*用户路由控制*/
	// 用户登录页
	app.get('/user/signIn' , User.signIn);
	// 用户登陆信息操作
	app.post('/user/signInMess' , User.signInMess);
	// 用户邮箱匹配验证
	app.post('/user/emailMatch',User.emailMatch);
	// 注册邮箱存在验证
	app.post('/user/emaliExist' ,User.emailExist);
	// 用户昵称验证
	app.post('/user/nickName' , User.nickNameMatch);
	// 用户注册验证码发送
	app.get('/user/verification' , User.verficatCodeSend);
	// 验证码匹配验证
	app.post('/user/verifyMatch' , User.verifiyCodeMath);
	// 用户登录密码验证
	app.post('/user/passwordMatch' , User.passwordMatch);
	// 用户注销登录
	app.get('/user/exit',User.userExit);
	// 用户注册页
	app.get('/user/signUp' , User.signUp);
	// 用户注册信息处理
	app.post('/user/signUpMess' , User.signUpMess);

	// webGL静态资源加载路径
	app.get('/webGL/:name', Resourse.image);

}
