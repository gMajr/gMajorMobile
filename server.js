var express = require('express');
var router = express.Router();
var db = require(__dirname + '/db/db.js');
var port = process.env.PORT || 8080;
var server = express();
var express = require('express');
server.use(express.static(__dirname + '/www'));
server.listen(port);
db.init();

// API Router
router.get('/', function(req, res){
  console.log('get /api accessed');
});
server.use('/api', router);
router.route('/users')

  // create a bear (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    
    var username = req.body.name;  // set the users name (comes from the request)

    
    
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
