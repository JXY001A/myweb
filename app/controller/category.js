var Category = require('../modules/category.js');
var Essay = require('../modules/Eassy.js');

exports.showCategories = function(req, res) {
	
	Category
		.find({})
		.populate({
			path:'essaies',
			select:'_id essayTitli meta'
		})
		.exec(function(err,categories) {
			categories.forEach(function(o){
				o.essaies.sort(function(a,b){
					return b.meta.updateAt - a.meta.updateAt;
				});
			});
			res.render('categoryList',{
				categories:categories
			});
		});
}