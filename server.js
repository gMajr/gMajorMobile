var express = require('express');
var bodyParser = require('body-parser');
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
    // console.log(req.body);
    var username = req.body.name;  // set the users name (comes from the request)

    
    
  });

router.route('/conversations/:conversationId')
  .post(function(req, res){
    var message = req.body;
    console.log(message);

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
