// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var db = require(__dirname + '/db/db.js');
var path = require('path');
var fs = require('fs');

// server variables
var server = express();
var router = express.Router();
var port = process.env.PORT || 8080;

server.use(express.static(__dirname + '/www'));
server.listen(port);

db.init();

// API Router
// handles requests starting with '/api' 
server.use('/api', router);

router.use(bodyParser.json());

router.get('/', function(req, res){
  console.log('get /api accessed');
});

router.route('/threads')
  .post(function(req, res){
    var message = req.body;
    var newThread = {};
    newThread.music = message.music;
    newThread.authors = [message.author];
    newThread.messages = [message.message];
    newThread.photos = [message.photoUrl];
    newThread.timestamps = [message.timestamp];
    newThread.fbids = [message.fbid];
    db.insert('gmajor.threads', newThread, res);
  })
  .get(function(req, res){
    var parsedUrl = url.parse(req.url);
    var params = querystring.parse(parsedUrl.query);
    db.match('gmajor.threads', res, params);
  });

router.route('/threads/:threadId')
  // appends a message to the thread in the DB with id threadId
  .post(function(req, res){
    var message = req.body;
    var threadId = req.params.threadId;
    db.append('gmajor.threads', res, threadId, message);
  })
  // functional but is not currently used
  .get(function(req, res){
    var threadId = req.params.threadId;
    db.find('gmajor.threads', res, threadId);
  });
