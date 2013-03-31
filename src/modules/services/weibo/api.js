var HOST_WEIBO_API = 'api.weibo.com';
var URL_LOAD_SOMEONE_WEIBOS = '/2/statuses/user_timeline.json';
var requestHttps = require('https').request;
var access_token = '2.00_F7gyBPyTCcB102ad0d8043oFrBE';

var loadSomeoneWeibos = function(username, callback) {
    var options = {
      hostname: HOST_WEIBO_API,
      port: 443,
      path: URL_LOAD_SOMEONE_WEIBOS + '?access_token=' + access_token + '&screen_name=' + username,
      method: 'GET'
    };
    var buf = '';
    var data = null;
    var req = requestHttps(options, function(res) {
        console.log('weibo load response');
        res.on('data', function(chunk) {
            buf += chunk;
        });
        res.on('end', function() {
            try{
                data = JSON.parse(buf);
            }catch(e){
                console.log(e);
            };
            callback && callback(data);
        });
    });
    req.end();

    req.on('error', function(e) {
      console.log('https request error:');
      console.error(e);
    });
};

exports.loadSomeoneWeibos = loadSomeoneWeibos;