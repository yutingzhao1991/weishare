var DEFAULT_DATA = {
    '0': '我爱你',
    '1': '一次在乡下，想问路，见一老大爷捧着一个大西瓜在前面走，就赶上去。“大爷，请问人民北路怎么走？”大爷和蔼可亲地笑笑，示意我将西瓜接过来，然后两手一摊，“我也不晓得。”',
    '2': '一头猪从猪圈里面冲出来，直接撞到树上，死了。为什么？',
    '3': 'javascript是一门脚本语言',
    '4': 'CSS主要应用与浏览器的HTML美化',
    '5': '《毛泽东文选》',
    '6': '笑死哥了：xiaosigele',
    '7': '我靠',
    '8': '你人品已经用光',
    '9': 'http://blog.yutingzhao.com'
};
var HINT_TEXT = ['回复0表白',
    '回复1看笑话',
    '回复2脑筋急转弯',
    '回复3看javascript知识',
    '回复4看CSS知识',
    '回复5推荐书籍',
    '回复6推荐微信公众帐号',
    '回复7对骂',
    '回复8看人品',
    '回复9看博主',
    '功能正在不断建设中，敬请期待！'].join('; ');
function buildMessage(data){
    if(DEFAULT_DATA[data]) {
        return DEFAULT_DATA[data];
    } else {
        return HINT_TEXT;
    }
}

exports.buildMessage = buildMessage;