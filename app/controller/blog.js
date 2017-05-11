/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-05-07 16:02:46
 * @desc:    (博客逻辑控制模块)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
// 博客受加载
var Essay = require('../modules/Eassy.js');
exports.blogIndex = function(req, res) {
        Essay.fetch(function(err, essays) {
            res.render('blog', {
                essays: essays
            });
        });
    }
    // 分页数据请求
exports.blogEssays = function(req, res) {
    // 对传输上来页码转化为整型
    var page = parseInt(req.query.page, 10);
    // 每次查询返回的数据条数
    var num = 6;
    // 计算需要跳过的数据条数
    var skip = page * num;
    Essay.findLimit(num, skip, function(err, essays) {
        if (err) {
            console.log(err);
        }
        if (essays.length) {
            res.render('singleBox/flowBox', {
                essays: essays,
                pageNum: page
            });
        } else {
            res.send('finished');
        }
    });

    // var img3 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494229863028&di=364b6940a756bef3d0ee308ce788734b&imgtype=0&src=http%3A%2F%2Fauctions.c.yimg.jp%2Fimages.auctions.yahoo.co.jp%2Fimage%2Fra177%2Fusers%2F7%2F9%2F2%2F4%2Fhawozuki-img600x403-1429700946zzdrvs23108.jpg';
    //    var obj = {};
    //    var arr = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494229788909&di=75a80511642cd9d12f01d419b7fd54bc&imgtype=0&src=http%3A%2F%2Fwww.hbenshi.cn%2Fd%2Ffile%2Ftuku%2Fpicture%2F201704%2F262cb17b2f8cd922cff94bddb6f7d7ce.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494229788907&di=f283b46dd9982cdc58fb078734af097c&imgtype=0&src=http%3A%2F%2Fwww.cd-pa.com%2Fbbs%2Fdata%2Fattachment%2Fforum%2F201606%2F08%2F202531w8zvcfpfweefve29.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494229788905&di=c8a787e33780db343e504bcc8b78cca1&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170107%2F8c4ff9aa93054f3e9d18b0d518defdb1_th.jpg'];
    // obj.essayTitli = 'hello worls';
    //    obj.desc =  "hello world hello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhell你好比你好比你好你好比你好你好比你好你好比你好你好比你好你好比你好你好你好比你好你好比你好你好比你好你好比你好";
    //    obj.content =  '你好比你好你好比你好你好比你好你好比你好';
    //      for(var i=0;i<2;i+=1){
    //        obj.faceImg =  arr[Math.ceil(i%3)];
    //        var essay = new Essay(obj);
    //        essay.save(function(error, essay) {
    //            if (error) {
    //                console.log(error);
    //            }
    //        });
    // }
    //    res.send('finished');
    // $.get('/blog/essyas',{num:1,skip:6},function(data) {
    //  alert(data);
    // });
}

// 文章详情页
exports.essayShow = function(req, res) {
    var essayId = req.params.id;
    Essay.findById(essayId, function(err, result) {
        if (err) {
            console.log(err);
        }
        res.render('essay');
    });
}
exports.essayUpload = function(req, res) {
    res.render('essayUpload');
}