function loadSound(ext) {
  var request = new XMLHttpRequest();
  var url = window.location.origin + '/api/' +  ext;
  request.open("GET", url, true); // Path to Audio File
  request.responseType = "arraybuffer"; // Read as Binary Data
  request.onload = function() {
      var incomingData = request.response;
      store(incomingData, ext);
  };

  request.send();

	}


function store(incomingData, ext) {
    source = context.createBufferSource(); // Create Sound Source
    context.decodeAudioData(incomingData, function(buffer){
      drumSounds[ext] = buffer;
    })
};

var drumSounds = {};

var routes = ['kick', 'hh', 'synride', 'syncowbell', 'synfx', 'synshaker'];

for ( var i = 0; i < routes.length; i++ ){
  loadSound( routes[i] );
}
