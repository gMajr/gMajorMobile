// This imports sounds from the server.  These are the only sounds that are not synthesized.  We load 
// the sounds at runtime, and then save them in an object called drumSounds
// To understand this code more, please reference my blog post:
// http://www.willvillanueva.com/the-web-audio-api-from-nodeexpress-to-your-browser/

function loadSound(ext) {
  var request = new XMLHttpRequest();
  var url = window.location.origin + '/' + ext;
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
      drumSounds[ext.slice(0, ext.length -4)] = buffer;
    });
};

var drumSounds = {};

var routes = ['kick.wav', 'hh.wav', 'synride.wav', 'syncowbell.wav', 'synfx.wav', 'synshaker.wav'];

for ( var i = 0; i < routes.length; i++ ){
  loadSound( routes[i] );
}
