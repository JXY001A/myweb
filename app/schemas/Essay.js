/*
    文章Schema
 */
var mongoose = require('mongoose');
var schema  = mongoose.Schema;
var objectId = schema.Types.ObjectId;
var essaySchema = new mongoose.Schema({
    essayTitli: String,
    desc: String,
    content: String,
    faceImg:{
        type:String,
        default:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495506085&di=4f6286e994e57e221c9ec85f6399e4d9&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F04%2F03%2F5672b8750001c_1024.jpg'
    },
    author:{
        type:objectId,
        ref:'User'
    },
    category:{
        type:objectId,
        ref:'Category'
    },
    meta: {
        createAt: {
            type: Date,
            defaule: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
// 在保存之前执行
essaySchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

essaySchema.statics = {
    // 全部查询，依据更新的时间排序
    fetch: function(cb) {
            return this
                .find({})
                .sort({'meta.updateAt':-1})
                // 执行回调函数
                .exec(cb);
    },
    // 通过ID查询
    findById: function(id, cb) {
        return this
                .findOne({
                    _id: id
                })
                .exec(cb);
    },
    // 分页查询
    findLimit: function(num, skip, cb) {
        return this
                .find({})
                .sort({'meta.updateAt':-1})
                .skip(skip)
                .limit(num)
                .exec(cb);
    }
}
module.exports = essaySchema;