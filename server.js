var express = require('express');
var db = require(__dirname + '/db/db.js');
db.init();

var port = process.env.PORT || 8080;
var server = express();
server.use(express.static(__dirname + '/www'));
server.listen(port);
