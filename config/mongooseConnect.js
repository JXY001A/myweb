/*
	mongDB数据库的连接
 */
exports.mogooseConnect = function() {
    var mongoose = require('mongoose');
    var url = 'mongodb://localhost:27017/webApp';
    mongoose.connect(url);

    mongoose.connection.on('connected', function() {
        console.log('Mongoose connection open to ' + url);
    });
    mongoose.connection.on('error', function() {
        console.log("mongodb 连接错误");
    });
    mongoose.connection.on('disconnected', function() {
        console.log("mongodb 断开连接");
    });
}
