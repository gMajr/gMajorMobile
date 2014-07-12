var express = require('express');

var server = express();
server.use(express.static(__dirname + '/www'));
var port = process.env.PORT || 1337;
server.listen(port);
