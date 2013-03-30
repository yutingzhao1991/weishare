var config = require('../../config').config;
var weixinUtil = require('../util/weixin');

function judgeAuthentication(signature, timestamp, nonce, echostr) {
    return true;
}

//认证
function authenticate(req, res, next){
    //console.log(req);
    signature = req.query.signature;//   微信加密签名
    timestamp = req.query.timestamp;//   时间戳
    nonce = req.query.nonce;//    随机数
    echostr = req.query.echostr; //随机字符串
    if(judgeAuthentication(signature, timestamp, nonce, echostr)) {
        //通过微信官方认证来源验证
        res.send(echostr);
    } else {
        res.send('error.untrusted');
    }
}

//自动回复消息
function reply(req, res, next){
    console.log('get reply from weixin:' + req);
    var reply = weixinUtil.encode('text', {
        toUser: 'yutingzhao1991',
        fromUser: 'web-fe',
        content: '还在开发中哦，耐心等待哦亲'
    });
    res.send(reply);
}

exports.authenticate = authenticate;
exports.reply = reply;