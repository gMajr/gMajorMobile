var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var router = express.Router();
var db = require(__dirname + '/db/db.js');
var port = process.env.PORT || 8080;
var server = express();
var express = require('express');
var path = require('path');
var fs = require('fs');

server.use(express.static(__dirname + '/www'));
server.listen(port);
db.init();

// API Router
// handles requests starting with '/api' 
server.use('/api', router);

router.use(bodyParser.json());

router.get('/kick', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var filepath = path.join(__dirname, 'sounds/kick.wav');
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});

router.get('/hh', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var filepath = path.join(__dirname, 'sounds/hh.wav');
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});

router.get('/synride', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var filepath = path.join(__dirname, 'sounds/synride.wav');
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});

router.get('/syncowbell', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var filepath = path.join(__dirname, 'sounds/syncowbell.wav');
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});

router.get('/synshaker', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var filepath = path.join(__dirname, 'sounds/synshaker.wav');
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});

router.get('/synfx', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var filepath = path.join(__dirname, 'sounds/synfx.wav');
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});

router.get('/', function(req, res){
  console.log('get /api accessed');
});

router.route('/users')
  // create a bear (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    var user = req.body;
    db.insert('gmajor.users', user, res);
  })
  .get(function(req, res){
    console.log('yo');
    db.find('gmajor.users', res);
  });

router.route('/users/:userId')
  .post(function(req, res){
    var message = req.body;
    var conId = req.params.userId;
    db.update('gmajor.users', conId, message, res);
  })
  .get(function(req, res){
    var conId = req.params.userId;
    db.find('gmajor.users', res, conId);
  });

router.route('/threads')
  .post(function(req, res){
    var message = req.body;
    var newThread = {};
    newThread.music = message.music;
    newThread.authors = [message.author];
    newThread.messages = [message.message];
    newThread.timestamps = [message.timestamp];
    newThread.fbids = [message.fbid];
    db.insert('gmajor.threads', newThread, res);
  })
  // functional but is not currently used
  .get(function(req, res){
    var parsedUrl = url.parse(req.url);
    var params = querystring.parse(parsedUrl.query);
    db.match('gmajor.threads', res, params);
  });
  // 
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
