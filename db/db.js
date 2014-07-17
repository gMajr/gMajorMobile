var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://MongoLab-r:MBC1Zu.wH4o6g02MiEDSxOml1YfGewuVHMG1Ofe9Exc-@ds050077.mongolab.com:50077/MongoLab-r';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
module.exports = {
  init: function(){
    console.log('test');
  },
  update: function(collectionName, id, data, res){
    MongoClient.connect(connectionString, function(err, db) {
      if(err) throw err;
      db.collection(collectionName).findAndModify(
        {_id: +id},
        [['_id','asc']],
        {$set: data},
        {},
        function(err, object) {
            if (err){
              throw err;
            }else{
              res.send(object);
            }
        });
    });
  },
  insert: function(collectionName, data, res){
    MongoClient.connect(connectionString, function(err, db) {
      if(err) throw err;
      db.collection(collectionName).insert(data, function(err, item){
        if (err){
          throw err;
        }else{
          res.send(item);
        }
      });
    });
  }
  // remove: function(){}

};
