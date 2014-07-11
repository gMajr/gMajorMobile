var getSound = function(source, storage){
  var request = new XMLHttpRequest();
  request.open("GET", source, true);
  request.responseType = "arraybuffer";
  console.log(request);
  request.onload = function() {
    var incomingData = request.response;
    console.log(request.response)
    storage.sound = incomingData;
  };

  request.send();
};
