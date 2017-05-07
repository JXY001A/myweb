var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 设置服务器端口号
var port = 3000;
var app = express();

// 设置视图文件资源路径
app.set('views', path.join(__dirname, 'app/views'));
// 将系统路径保存包本地变量中
app.locals.dir = __dirname;
// 指定模板引擎
app.set('view engine', 'jade');


app.use(logger('dev'));
// 默认对异步传输的json数据格式化处理
app.use(bodyParser.json());
// 对form表弟数据格式化处理
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// 指定静态资源的加载路径，__dirname值当前的系统路径
app.use(express.static(path.join(__dirname, 'public')));

// 设置监听端口号
app.listen(port,function() {
	console.log('程序运行在' + port + '端口');
});



require('./routes/router.js')(app);

module.exports = app;
