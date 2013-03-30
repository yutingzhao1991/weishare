/**
 * routing
 * author YuTingzhao.com
 * date 2013 03 29
 */

/**
 * Module dependencies.
 */
var config = require('./config').config;
var weixin = require('./modules/controllers/weixin');

exports = module.exports = function(app) {
  app.get('/test', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  });
  app.get('/weishare', weixin.authenticate);
  app.post('/weishare', weixin.reply);
};
