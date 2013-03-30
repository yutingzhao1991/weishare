var textResponseTemplate = ['<xml>',
 '<ToUserName><![CDATA[${toUser}]]></ToUserName>',
 '<FromUserName><![CDATA[${fromUser}]]></FromUserName>',
 '<CreateTime>${createTime}</CreateTime>',
 '<MsgType><![CDATA[text]]></MsgType>',
 '<Content><![CDATA[${content}]]></Content>',
 '<FuncFlag>${funcFlag}</FuncFlag>',
 '</xml>'].join('');

function stringifyXML(name, content) {
    return '<' + name +'>' + content + '</' + name + '>';
}

function encodeResponse(data){
    //将JSON格式的内容转化为符合微信接口的内容
    var patt = /\$\{([\d\w-_]+)\}/g;
    var result = textResponseTemplate.replace(patt, function(all, value) {
        //console.log(arguments);
        return data[value];
    });
    return result;
}

function decodeRequest(data){
    var result = {};
    try{
        result.toUser = data.match(/<ToUserName><\!\[CDATA\[(\S+)\]\]><\/ToUserName>/)[1];
        result.fromUser = data.match(/<FromUserName><\!\[CDATA\[(\S+)\]\]><\/FromUserName>/)[1];
        result.content = data.match(/<Content><\!\[CDATA\[(\S+)\]\]><\/Content>/)[1];
    } catch (e) {
        console.log(e);
    }
    return result;
}

exports.encodeResponse = encodeResponse;
exports.decodeRequest = decodeRequest;