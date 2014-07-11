// set up grid context
window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();


var grid = function(rows, cols){
  var result = [];
  for ( var i = 0; i < rows; i++ ){
    result.push([]);
    for ( var j = 0; j < cols; j++ ){
      result[i][j] = 0;
    }
  }
  return result;
};
// too many params for an interative function
// intsrument should have this as a method
var playSounds = function(SoundProfile, Modules, frequency, volume, sampleRate, duration, start){
  var attackLen = sampleRate * SoundProfile.attack();
  var buffer = context.createBuffer(1, duration * sampleRate, sampleRate);
  var data = buffer.getChannelData(0);

  for (i = 0; i < data.length; i++){
    if ( i < attackLen){
      amplitude = volume * (i/(sampleRate * SoundProfile.attack()))
    }else{
      amplitude = volume * Math.pow((1-((i-(sampleRate*SoundProfile.attack()))/(sampleRate*(duration-SoundProfile.attack())))),SoundProfile.dampen(sampleRate, frequency, volume))
    }
    data[i] = amplitude * SoundProfile.wave(i, sampleRate, frequency, volume)
  }

  var osc = context.createBufferSource();
  var gainNode = context.createGain();

  // fancy word for volume
  gainNode.gain.value = 1;

  osc.buffer = buffer;
  // turn off to call once // turn off the 's' from the function (see below)
  osc.loop = true;
  osc.connect(context.destination);

  //play sound after start time
  osc.noteOn(start);
};
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

var Sound = function(source){
  getSound(source, this);
};

Sound.prototype.play = function(){
  playNote(this.sound);
};
// builds main grid ( 1st implementation)
var mainGrid = grid( 8, 8 );

// starts grid run
// feels clunky and dumb
var run = function(grid){
  for ( var current = 0; current < grid[0].length; current++ ){
    for (var key = 0; key < grid.length; key++){
      if ( grid[key][current] ){
        playSounds( SoundProfile, Modules, keys[key], 1, 44100, 1, current / grid[0].length );
      }
    }
  }
};

// hard key assignment, lame, but quick;
var keys = [100, 200, 300, 400, 500, 600, 700, 800];

// [[0,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0]]
// keysNum  = row.length

// angular should be able to turn these keys on/off on click.
// ng-repeat make toggleable buttons (change 0 to 1)