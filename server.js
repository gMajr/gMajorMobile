var express = require('express');
var db = require(__dirname + '/db/db.js');
db.init();

var port = process.env.PORT || 8080;
var server = express();
server.use(express.static(__dirname + '/www'));
server.listen(port);
var express = require('express');
var db = require(__dirname + '/db/db.js');
db.init();
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
