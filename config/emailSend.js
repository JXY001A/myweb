exports.emailSend = function(verification,cb) {
    var nodemailer = require('nodemailer');

    //创建一个发送服务器
    var transporter = nodemailer.createTransport({
        // 指定发送邮件的服务器
        service: 'qq',
        auth: {
            // 发送者的邮箱
            user: '1045970505@qq.com',
            // 生成的授权码
            pass: 'tquzqffjymfjbbed'
        }
    });

    // 设置发送信息
    var mailOptions = {
        // 发送这信息
        from: '1045970505@qq.com',
        //接受者信息 
        to: verification.email,
        // 发送邮件的标题
        subject: '来自于捋码博客的验证码',
        // 以重文本的形式发送邮件与html任选
        text: 'Hello world ?', // plain text body
        // 发送的邮件为html
        html: '<center style="margin-top:160px;"><h1 style="font-size:100px;color:#28ac73">'+ verification.code+'</h1></center>' // html body
    };

    // 发送邮件
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return cb(error);
        }
        
        console.log('Message %s sent: %s', info.messageId, info.response);
        console.log('邮件发送成功');
        var success = true;
        return cb(success);
    });
}