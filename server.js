var express = require('express');

var server = express();
var port = process.env.PORT || 1337;
server.get('/', function(req, res){
  res.send('hello world');
});
server.listen(port);


