var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://MongoLab-r:MBC1Zu.wH4o6g02MiEDSxOml1YfGewuVHMG1Ofe9Exc-@ds050077.mongolab.com:50077/MongoLab-r';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
module.exports = {
  init: function(){
    console.log('test');
  },
  update: function(collectionName, id, data){
    MongoClient.connect(connectionString, function(err, db) {
      if(err) throw err;
      console.log({_id: +id});
      db.collection(collectionName).findAndModify(
        {_id: +id},
        [['_id','asc']], // query
        {$set: data}, // replacement, replaces only the field "hi"
        {}, // options
        function(err, object) {
            if (err){
                console.warn(err.message);  // returns error if no matching object found
            }else{
                console.log(object);
            }
        });
    });
  },
  insert: function(collectionName, data){
    MongoClient.connect(connectionString, function(err, db) {
      if(!err) {
        console.log("We are connected to a mongodb server");
        db.collection('gmajor.' + collectionName, function(err, collection){
          if(err){
            console.log('collection retrieval error: ', err);
            db.close();
          }
          console.log(data);
          collection.insert(data, function(err,result){
            if(err){
              console.log('insert into gmajor.' ,collectionName, ' error: ', err);
              db.close();
            }
            console.log('insert into gmajor.' ,collectionName, ' result: ', result);
            db.close();
          });
        });
      } else {
        console.log('mongo connection error: ', err);
        db.close();
      }
    });
  }
};
