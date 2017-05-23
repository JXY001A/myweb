var mongoose = require('mongoose');
var categorySchema = require('../schemas/category.js');
var Category = mongoose.model('Category',categorySchema);
module.exports = Category;