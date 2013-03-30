/*!
 * nodeclub - app.js
 */

/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
var config = require('./config').config;
var routes = require('./routes');

var app = express();
// 定义开发环境
app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
// routes
routes(app);
app.listen(config.port);

console.log("app start at port:"+config.port);
