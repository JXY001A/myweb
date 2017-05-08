/*
    文章Schema
 */
var mongoose = require('mongoose');
var essaySchema = new mongoose.Schema({
    essayTitli: String,
    desc: String,
    content: String,
    faceImg: String,
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
                .sort('meta.updateAt')
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
                .sort('meta.updateAt')
                .skip(skip)
                .limit(num)
                .exec(cb);
    }
}
module.exports = essaySchema;