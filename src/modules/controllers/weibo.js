var WEIBO_LIST_TEMPLATE = ['来自：<a href="${url}">${screen_name}</a> 粉丝：${followers_count}',
'<br>${text}',
'<br>转发：${reposts_count} 评论：${comments_count}',
'<hr>'].join('');
var templates = require('../../views/templates');
var weiboService = require('../services/weibo/weibo');

//增加一个有价值的微博用户
var addUser = function(){};
//移除一个微博用户
var removeUser = function(){};
//获取微博用户列表
var listUsers = function(){};

var listMore = function(req, res) {
    var content = '';
    var count = req.query.count || 10;
    var weibos = weiboService.getWeiboArray('hots', count);
    for(var i=0; i<Math.min(count, weibos.length); i++) {
        content += WEIBO_LIST_TEMPLATE.replace('${screen_name}', weibos[i].user.screen_name)
            .replace('${url}', weibos[i].user.url)
            .replace('${text}', weibos[i].text)
            .replace('${reposts_count}', weibos[i].reposts_count)
            .replace('${comments_count}', weibos[i].comments_count)
            .replace('${followers_count}', weibos[i].user.followers_count);
    }
    res.send(templates.HTML_TEMPlATE.replace('${title}', '前端观察').replace('${body}', content));
};

exports.add = addUser;
exports.remove = removeUser;
exports.listUsers = listUsers;
exports.listMore = listMore;