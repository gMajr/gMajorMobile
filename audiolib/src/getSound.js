// We can use this function for loading custom sounds
// It also can be used to load the sounds we'll eventually need 
// code below looks messy, and does not look like it will work.  we need to expand this more.
// getSound should be a prototype function of grid.


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
