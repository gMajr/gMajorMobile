var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring')
var router = express.Router();
var db = require(__dirname + '/db/db.js');
var port = process.env.PORT || 8080;
var server = express();
var express = require('express');
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

router.route('/users')
  // create a bear (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    var user = req.body;
    db.insert('gmajor.users', user, res);
  })
  .get(function(req, res){
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
    console.log(conId);
    db.find('gmajor.users', res, conId);
  });

router.route('/threads')
  // TODO: Check that this works
  .post(function(req, res){
    var message = req.body;
    db.insert('gmajor.threads', message, res);
  })
  // TODO: Check functionality for /threads
  .get(function(req, res){
    var parsedUrl = url.parse(req.url);
    var params = querystring.parse(parsedUrl.query);
    db.match('gmajor.threads', res, params);
  });

router.route('/threads/:threadId')
  // appends a message to a thread
  .post(function(req, res){
    var message = req.body;
    var threadId = req.params.threadId;
    db.append('gmajor.threads', res, threadId, message);
  })
  .get(function(req, res){
    var threadId = req.params.threadId;
    db.find('gmajor.threads', res, threadId);
  });



// Restrictions: usernames must be unique
// API
// /user/:id/friends
  // POST: 
    // Adds UID associated with the name to user's friends array
    // {friend: friendname}
  // GET: 
    // Returns array of current user's friends

// server responsibilities: 
  // handle authentication/login, sessions/cookies
  // 
