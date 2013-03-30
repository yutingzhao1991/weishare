function stringifyXML(name, content) {
    return '<' + name +'>' + content + '</' + name + '>';
}

function encode(type, data){
    //将JSON格式的内容转化为符合微信接口的内容
    var result = '<xml>';
    result += stringifyXML('ToUserName', data.toUser);
    result += stringifyXML('FromUserName', data.fromUser);
    result += stringifyXML('CreateTime', Date.now());
    result += stringifyXML('FuncFlag', '0');
    switch(type) {
        case 'text':
            //回复文本消息
            result += stringifyXML('MsgType', 'text');
            result += stringifyXML('Content', data.content);
            break;
    }
    result += '</xml>'
    return result;
}

function decode(type, data){
    //将微信推送的内容转化为JSON格式
    switch(type) {
        case 'text':
            //文本消息
            break;
    }
    return {};
}

exports.encode = encode;
exports.decode = decode;