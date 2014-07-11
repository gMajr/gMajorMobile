// eventual params = buffer, pan, x, y, z, sendGain, mainGain, playbackRate, noteTime
// hardcoded for now

var temp = "http://www.freesound.org/people/SeryLis/sounds/181425/download/181425__serylis__guitar-chord.wav"
//buffer is basically the sound
var playNote = function(buffer){
  var pan = "";
  var x;
  var y;
  var z;
  var sendGain;
  var mainGain;
  var playbackRate;
  var noteTime = 0;

  var sound = context.createBufferSource();
  console.log(buffer, sound);
  context.decodeAudioData(buffer, function(temp){
      // storage.sound = buffer;
    sound.buffer = temp; 
  })
  sound.playbackRate.value = null // edit soon

  var finalNode;
  //handle panning
  var dryGainNode = context.createGain();
  // var drayGainNode.gain.value = mainGain;

  finalNode = sound;
  finalNode.connect(dryGainNode); 

  sound.start(noteTime);
};