var category = require('../modules/category.js');
var Essay = require('../modules/Eassy.js');
exports.showCategories = function(req, res) {
	category.fetch(function(err, categories) {
		if (err) {
			console.log(err);
		}
		var count = 0;
		categories.forEach(function(category) {
			var essayArr = category.essaies;
			var len = essayArr.length;
			count+=len;
		});
		console.log(count);
	});
}