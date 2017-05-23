/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-05-07 17:17:40
 * @desc:    (用户逻辑控制模块)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
// 文件上传插件
var multiparty = require('multiparty');
var fs = require('fs');
var Category = require('../modules/category.js'); 
var User = require('../modules/user.js');
var Essay = require('../modules/Eassy.js');
// 用户登陆页
exports.signIn = function(req, res) {
		res.render('signIn');
	}
	// 用户登录处理
exports.signInMess = function(req, res) {
		var user = req.body;

		User.findOne({
			email: user.email
		}, function(err, result) {
			if (err) {
				console.log(err);
			}
			// 将用户信息保存到session中
			req.session.user = result;
			res.redirect('/blog/index');
		});
	}
	//用户退出登录操作
exports.userExit = function(req, res) {
		delete req.session.user;
		//用户注销成功后跳转到博客首页
		res.redirect('/blog/index');
	}
	// 用户密码验证
exports.passwordMatch = function(req, res) {
		var email = req.body.email;
		var password = req.body.password;
		User.findOne({
			email: email
		}, function(err, result) {
			if (err) {
				console.log(err);
			}
			result.comparePassword(password, function(err, match) {
				if (match) {
					res.send('success');
				} else {
					res.send('fail')
				}
			});
		});

	}
	// 用户注册页
exports.signUp = function(req, res) {
		res.render('signUp');
	}
	// 用户登录处理
exports.signUpMess = function(req, res) {
		var user = req.body;
		// 用户注册时清除保存在session中的数据
		req.session.verifiyCode = null;
		// 创建保存的user对象
		var _user = new User({
			nickName: user.nickName,
			password: user.password1,
			email: user.email,
		});
		// 保存用户注册信息
		_user.save(function(err, result) {
			if (err) {
				console.log(err);
			}
			// 保存成功后跳转至登陆页
			res.redirect('/user/signIn');
		});

	}
	// 用户邮箱登录验证
exports.emailMatch = function(req, res) {
		var email = req.body.email;
		User.findOne({
			email: email
		}, function(err, result) {
			if (err) {
				console.log(err);
			}
			// 存在则表示用户注册过
			if (result) {
				res.send('');
			} else {
				// 否则验证不通过
				res.send('用户名不存在');
			}
		});
	}
	// 用户注册邮箱查重操作
exports.emailExist = function(req, res) {
		var email = req.body.email;
		User.findOne({
			email: email
		}, function(err, result) {
			if (err) {
				console.log(err);
			}
			if (result) {
				res.send('邮箱已经被注册');
			} else {
				res.send('');
			}
		});
	}
	// 用户注册时昵称查重操作
exports.nickNameMatch = function(req, res) {
		var nickName = req.body.nickName;
		console.log(nickName);
		User.findOne({
			nickName: nickName
		}, function(err, result) {
			if (err) {
				console.log(err);
			}
			if (result) {
				res.send('用户名已经被占用');
			} else {
				res.send('');
			}
		});
	}
	// 验证码发送
exports.verficatCodeSend = function(req, res) {
		var emailUrl = req.query.email;
		var email = require('../../config/emailSend.js');
		var code = '';
		for (var i = 0; i < 4; i += 1) {
			var num = Math.floor(Math.random() * 9);
			code += num;
		}
		var urlCode = {
			email: emailUrl,
			code: code
		}
		email.emailSend(urlCode, function(success) {
			if (success) {
				console.log("生成的验证码为： " + code);
				// 将验证码保存到session中
				req.session.verifiyCode = code;
				res.send('success');
			} else {
				res.send('邮件发送出现错误，请过会后重试！');
			}
		});
	}
	// 验证码匹配验证
exports.verifiyCodeMath = function(req, res) {
	var code = req.body.vertifiy;
	console.log(req.session.verifiyCode)
	console.log(code)
	if (req.session.verifiyCode == code) {
		res.send('');
	} else {
		res.send('验证码错误');
	}
}
exports.userMessModify = function(req, res) {
	res.render('userMessModify');
}
// 用户头像上传处理
exports.saveUserPicture = function(req, res, next) {
	
		next();
}
// 用户个人信息私改处理
exports.saveUserMess = function(req, res) {
	var userMess = req.query;
	console.log(222);
	console.log(userMess);
}
// 用户博文上传保存
exports.essayUpload = function(req,res){
	var user = req.session.user;
	var essay = req.body;
	var _essay = new Essay({
		essayTitli:essay.title,
		desc:essay.desc,
		content:essay.essayContent,
		category:essay.category,
		author:user._id,
		faceImg:essay.poster
	});
	_essay.save(function(err,result) {
		if (err) {
			conosle.log(err);
		}
		// 将数据文章数据保存之后，在将文章的id添加至分类表中
		Category.findById(result.category,function(err,category){
			category.essaies.push(result._id);
		});
		// 上传成功后重定向至文章详情页
		res.redirect('/blog/'+result._id);
	});
}