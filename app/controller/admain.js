// 后台管理控制
var Essay = require('../modules/Eassy.js');
var User = require('../modules/User.js');
var _underscore = require('underscore');
var Category = require('../modules/category.js');
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
			// 再将修改后的信息保存之前首先查询到文章上传时的分类信息
			Category.findById(result.category, function(err, category) {
				// 循环类型中保存的essays的id来找到当前修改文章的id并删除之
				if (category) {
					category.essaies.forEach(function(o, index) {
						if (essayId == o.toString()) {
							category.essaies.splice(index+1,1);
						}
					});
				}
			});
			// 将上传的数据整合为一个新的数据结构_essay
			_essay = _underscore.extend(result, blog);
			// 保存整合好的数据
			_essay.save(function(err, essay) {
				if (err) {
					console.log(err);
				}
				// 保存完成后将文章添加到对应的分类中
				Category.findById(essay.category,function(err,category){
					category.essaies.push(essay._id);
					category.save(function(err,cate){
						console.log('Success');
					});
				});
				res.redirect('/blog/' + essay._id);
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