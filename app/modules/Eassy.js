var mongoose = require('mongoose');
var eassayScheam = require('../schemas/Essay.js');
var Essay = mongoose.model('Essay' , eassayScheam );
module.exports = Essay;