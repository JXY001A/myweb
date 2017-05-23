// 后台管理控制
var Essay = require('../modules/Eassy.js');
var User = require('../modules/User.js');
var _underscore = require('underscore');
// 每一页的显示数量
var pageNum = 5;
exports.admainIndex = function(req, res) {
	Essay.find({})
		.populate('author', 'nickName')
		.sort({
			'meta.updateAt': -1
		})
		.limit(pageNum)
		.exec(function(err, results) {
			if (err) {
				console.log(err);
			}
			Essay.count(function(err, count) {
				if (err) {
					console.log(err);
				}
				var pageCount = Math.ceil(count / pageNum);
				res.render('admainIndex', {
					essays: results,
					pageCount: pageCount
				});
			});
		});
}

exports.deleteBlog = function(req, res) {
		var id = req.body.essayId;
		console.log(req.body);
		Essay.remove({
			_id: id
		}, function(err, result) {
			if (err) {
				console.log(err);
			}
			if (result.result.ok == 1) {
				res.json({
					status: 'scuccess'
				});

			} else {
				res.json({
					status: 'fail'
				});
			}
		});
	}
	// 文章内容修改
exports.blogModify = function(req, res) {
		var blog = req.body;
		var essayId = blog.essayId;
		Essay.findById(essayId, function(err, result) {
			_essay = _underscore.extend(result, blog);
			_essay.save(function(err, result) {
				if (err) {
					console.log(err);
				}
				res.redirect('/blog/' + result._id);
			});
		});
	}
	// 分页显示文章条数
exports.showBlogItem = function(req, res) {
	var page = req.body.page;
	var skip = parseInt(page, 10) * pageNum;
	console.log('skip', skip);
	Essay.find({})
		.populate('author', 'nickName')
		.sort({
			'meta.updateAt': -1
		})
		.skip(skip)
		.limit(pageNum)
		.exec(function(err, essays) {
			res.render('component/blogPageTempl', {
				essays: essays
			});
			console.log(essays.length);
		});
}