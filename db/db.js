// Assumes Azure deployment, falls back to local environment variables
// See Wiki page 'Setting up MongoDB with Mongolab' for details
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI ||
                      'mongodb://' + process.env.MONGO_USERNAME +
                      ':' + process.env.MONGO_PASSWORD +
                      '@' + process.env.MONGO_HOSTANDPORT +
                      '/' + process.env.MONGO_DBNAME;
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
        {_id: mongodb.ObjectID(id)},
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
  },

  find: function(collectionName, res, id){
    if (id !== undefined){
      id = {_id: mongodb.ObjectID(id)};
    }
    MongoClient.connect(connectionString, function(err, db) {
      if(err) throw err;
      db.collection(collectionName).find(id).toArray(function(err, item){
        if (err){
          throw err;
        }else{
          res.send(item);
        }
      });
    });
  },
  match: function(collectionName, res, params){
    MongoClient.connect(connectionString, function(err, db) {
      if(err) throw err;
      if(params['fbid'] !== undefined){
        db.collection(collectionName).find({fbids: params['fbid']}).toArray(function(err, item){
          if (err){
            throw err;
          }else{
            res.send(item);
          }
        });
      } else {
        db.collection(collectionName).find().toArray(function(err, item){
          if (err){
            throw err;
          }else{
            res.send(item);
          }
        });
      }
    });
  },
  append: function(collectionName, res, id, message){
    if (id !== undefined){
      id = {_id: mongodb.ObjectID(id)};
    }
    MongoClient.connect(connectionString, (function(err, db) {
      if(err) throw err;
      db.collection(collectionName).find(id).toArray((function(err, item){
        if (err){
          throw err;
        }else{
          item = item[0];
          item.music = message.music;
          item.authors.push(message.author);
          item.messages.push(message.message);
          item.timestamps.push(message.timestamp);
          item.fbids.push(message.fbid);

          delete item._id;
          console.log(item);
          this.update(collectionName, id._id.toString(), item, res);
        }
      }).bind(this));
    }).bind(this));
  }
};




