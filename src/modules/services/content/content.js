var weiboService = require('../weibo/weibo');
var config = require('../../../config').config;
var URL_MORE = 'http://weishare.cnodejs.net/more';

var DEFAULT_DATA = {
    '我爱你' : '亲，我也爱你哦！',
    '你是谁' : '哈哈，这都被你发现了。幕后主使是 yutingzhao.com'
};
var HINT_TEXT = ['感谢您对前端整理的关注！微信看前端，微博知世界！',
'前端整理致力于整理优秀的前端微博资源，让您不再错过前端的那些事。',
'直接回复小于100的数字查看对应数目的最新前端微博动态。',
'回复!查看一条随机微博。',
'每隔' + config.RELOAD_WEIBO_INTERVAL + '个小时更新一次，回复0查看上次更新时间。',
'您也可以回复@XXX 给我们推荐优秀的前端微博，当然也可以推荐您自己^_^'].join('\r\n');
function buildMessage(data){
    if(DEFAULT_DATA[data]) {
        return DEFAULT_DATA[data];
    } else {
        if(data == '0') {
            //回复上次更新时间
            return '最后一次更新时间为：' + weiboService.getLastUpdateTime();
        }
        if(data == '!') {
            return weiboService.getWeibo('random', 1);
        }
        if(/\d+/.test(data) && data.length < 3) {
            return weiboService.getWeibo('hot', 1) + '查看全部：' + URL_MORE + '?count='+parseInt(data);
        }
        return HINT_TEXT;
    }
}

exports.buildMessage = buildMessage;