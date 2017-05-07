/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-05-07 12:25:29
 * @desc:    (本地静态资源处理)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */

exports.image1 = function(req , res) {
	var publicPath ="../../public/images/";
	res.attachment(publicPath+'earth_surface_2048.jpg');
}
exports.image2 = function(req , res) {
	var publicPath ="../../public/images/";
	res.attachment(publicPath+'earth_normal_2048.jpg');
}
exports.image3 = function(req , res) {
	var publicPath ="../../public/images/";
	res.attachment(publicPath+'earth_specular_2048.jpg');
}
exports.image4 = function(req , res) {
	var publicPath ="../../public/images/";
	res.attachment(publicPath+'earth_clouds_1024.png');
}

