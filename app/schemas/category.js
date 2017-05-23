var mongoose = require('mongoose');
var schema = mongoose.Schema;
var objectId = schema.Types.ObjectId;
var categorySchema = new schema({
	essaies: [{
		type: objectId,
		ref: 'Essay'
	}],
	name: String,
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

categorySchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});
categorySchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.createAt')
			.exec(cb);
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb);
	}

};
module.exports = categorySchema;