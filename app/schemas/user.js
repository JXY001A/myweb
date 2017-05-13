var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRound = 10;
var userSchema = mongoose.Schema({
	nickName: String,
	password: String,
	email: String,
	picture:{
		type:String,
		default:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494672213091&di=00a1e91cd33a44c0a6dea40f08521bdd&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fsoft%2Fimages%2F2015%2F0115%2F20150115023412167.jpg'
	},
	rol: {
		type: Number,
		default: 0
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});
userSchema.methods = {
		// 用户登录密码验证
		comparePassword: function(_password, cb) {
			var hasePassword = this.password;
			bcrypt.compare(_password, hasePassword, function(err, res) {
				if (err) {
					cb(err);
				}
				cb(null, res);
			});
		}
	}
	// 数据保存之前的中间操作
userSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	var user = this;
	bcrypt.genSalt(saltRound, function(error, salt) {
		if (error) {
			return next(error);
		}
		
		bcrypt.hash(user.password, salt, function(error, hash) {
			if (error) {
				return next(error);
			}
			console.log('加密后的密码' + hash);
			user.password = hash;
			// 如果一切正常则向下执行
			next();
		});
	});
});
// 添加静态方法
userSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb);
	}
}
module.exports = userSchema;