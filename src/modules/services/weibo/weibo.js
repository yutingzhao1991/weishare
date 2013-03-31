var config = require('../../../config').config;
var api = require('./api');
var hotWeibos = [];
var lastUpdateTime = parseInt(Date.now() / 1000);
reloadWeibo(true);
setInterval(function(){
    try {
        reloadWeibo();
    } catch (e) {
        console.log('laod weibo task error:');
        console.log(e);
    }
}, 1000 * 60 * 60);

// 重装拉取微博
// @param {Boolean} 是否是初始化

function reloadWeibo(initFlag) {
    if(!initFlag && (Date.now() - lastUpdateTime < config.RELOAD_WEIBO_INTERVAL * 60 * 60) ){
        //如果间隔时间小于12个小时那么则不更新
        return;
    }
    var newWeibos = [];
    for(var i=0; i<config.WEIBO_USER_LIST.length; i++) {
        (function(username){
            console.log('load ' + username + ' weibos starts');
            findOutWeibo(username, function(result) {
                //将收集到的微博添加到微博列表中
                if(result) {
                    newWeibos = newWeibos.concat(result);
                    console.log('load ' + username + ' weibos completed, there are ' + result.length + 's weibo');
                } else {
                    console.log('load ' + username + ' weibos error');
                }
                completeLoadCall();
            });
        })(config.WEIBO_USER_LIST[i]);
    }
    var completedCount = 0;
    var completeLoadCall = function(){
        completedCount ++;
        if(completedCount >= config.WEIBO_USER_LIST.length) {
            hotWeibos = null;
            hotWeibos = sortWeibos(newWeibos);
            console.log('all weibo reload completed, there are total ' + hotWeibos.length);
        }
    };
    lastUpdateTime = parseInt(Date.now() / 1000);
}

// 对微博进行排序
// 按照热度排序
// @param {Array} 参与排序的微博
// @return {Array} 排序过后的微博
function sortWeibos(weibos) {
    weibos.sort(function(a, b){
        return getWeiboHotStatus(a) > getWeiboHotStatus(b) ? -1 : 1;
    });
    return weibos;
}

// 获取微博热度
// @param {weibo} 一条微博信息
// @return {int} 微博热度
function getWeiboHotStatus(weibo) {
    if(weibo.user.followers_count < 10) {
        // 小于10个粉丝，直接pass
        return 0;
    }
    return (weibo.reposts_count + weibo.comments_count) / (Math.log(weibo.user.followers_count) / Math.log(10));
}
// 查找微博
// @param {String} 微博用户的用户名
// @param {Function} 获取到微博后的回调函数
function findOutWeibo(username, callback) {
    api.loadSomeoneWeibos(username, function(data){
        if(!data) {
            callback && callback(null);
        } else {
            callback && callback(data.statuses);
        }
    })
};


// 获取微博
// @param {String} 获取微博的类型hot new random
// @param {Int} 获取的条数
// @return {Array} 微博列表
var getWeibo = function(type, count) {
    count = count || 1;
    var content = '';
    var buildText = function(weibo) {
        var text = '来自：' + weibo.user.screen_name;
        text += '\r\n' + weibo.text;
        text += '\r\n转发：' + weibo.reposts_count + ' 评论：' + weibo.comments_count + ' 粉丝：' + weibo.user.followers_count;
        text += '\r\n=========================\r\n';
        return text;
    }
    if(type == 'random') {
        var randomNum = parseInt(Math.random() * hotWeibos.length);
        return buildText(hotWeibos[randomNum]);
    }
    for(var i=0; i<Math.min(count, hotWeibos.length); i++) {
        content += buildText(hotWeibos[i]);
    }
    return content;
};
exports.getWeibo = getWeibo;
exports.getWeiboArray = function(){
    return hotWeibos;
};
exports.getLastUpdateTime = function() {
    var t = parseInt(Date.now() / 1000) - lastUpdateTime;
    return parseInt(t / 3600) + '小时,' + parseInt((t % 3600)/60) + '分钟,' + (t % 60) + '秒前'; 
}