var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://MongoLab-r:MBC1Zu.wH4o6g02MiEDSxOml1YfGewuVHMG1Ofe9Exc-@ds050077.mongolab.com:50077/MongoLab-r';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
module.exports= {
  init: function(){
    MongoClient.connect(connectionString, function(err, db) {
      if(!err) {
        console.log("We are connected to a mongodb server");
        console.log("Creating document {username: user, password: password} in gmajor.users ");
        db.collection('gmajor.users', function(err, collection){
          if(err){
            console.log('collection retrieval error: ', err);
          }
          collection.insert({username: 'user', password: 'password'}, function(err,result){
            if(err){
              console.log('insert into gmajor.users error: ', err);
            }
            console.log('insert into gmajor.users result: ', result);
          });
        });
      } else {
        console.log('mongo connection error: ', err);
      }
    });
  }
};
