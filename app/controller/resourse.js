/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-05-07 12:25:29
 * @desc:    (WebGL本地静态资源处理)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */

exports.image = function(req, res) {
	// 通过参数获取文件名
	var fileName = req.params.name;
	// 设置参数
    var options = {
    	// 文件资源的相对路径，如果这里不设置，那么faleName就需要绝对路径
        root: './public/images',
        // 设置是否提供隐藏文件
        dotfiles: 'deny',
        // 设置http头部
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    // 将文件发送出去
    res.sendFile(fileName, options, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
}
