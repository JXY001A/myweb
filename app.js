var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongooseCon = require('./config/mongooseConnect.js');
var session = require('express-session');
var cookie = require('cookie-session');
var mongoStore = require('connect-mongo')(session);
// 连接mogodb数据库
mongooseCon.mogooseConnect();

// 设置服务器端口号
var port = 3000;
var app = express();
app.locals.moment = require('moment');
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
app.use(bodyParser.urlencoded({
	extended: false
}));
// 指定静态资源的加载路径，__dirname值当前的系统路径
app.use(express.static(path.join(__dirname, 'public')));
// 实例化session
// cookieParser和session 在会话持久化时必须写在一起
app.use(cookieParser());
app.use(session({
	secret: 'jxy',
	// 用户session持久化处理
	store:new mongoStore({
		url:'mongodb://localhost:27017/webApp',
		collection:'sessions'
	})
}));
// 任何一次请求都会将session中的user保存到本地变量中
// 无论user是否存在，用于用户的登录验证
app.use(function(req,res,next){
	var _user = req.session.user;
	app.locals.user = _user;
	next();
});
// 设置监听端口号
app.listen(port, function() {
	console.log('程序运行在' + port + '端口');
});


// 加载路由控制模块
require('./routes/router.js')(app);

module.exports = app;