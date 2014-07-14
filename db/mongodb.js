module.exports= {
  init: function(){
    MongoClient.connect("mongodb://MongoLab-r:MBC1Zu.wH4o6g02MiEDSxOml1YfGewuVHMG1Ofe9Exc-@ds050077.mongolab.com:50077/MongoLab-r", function(err, db) {
      if(!err) {
      console.log("We are connected");
      }
    });
  }
};
