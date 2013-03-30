function stringifyXML(name, content) {
    return '<' + name +'>' + content + '</' + name + '>';
}

function encode(data){
    //将JSON格式的内容转化为符合微信接口的内容
    var result = '<xml>';
    for(var i in data) {
        result += stringifyXML(i, data[i]);
    }
    result += '</xml>'
    return result;
}

function decode(data){
    //将微信推送的内容转化为JSON格式
    var details;
    var result = {};
    var patt = /<(\w+)>([^<>]+)<\/\w+>/g;
    while ((details = patt.exec(data)) != null){
        console.log(details);
        if(details) {
            result[details[1]] = details[2];
        }
    }
    return result;
}

exports.encode = encode;
exports.decode = decode;