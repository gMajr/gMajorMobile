window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();
//This script initializes the web audio API.  It's functions will now all be called using the context variable.


//Need to build a pseudoclassical system.  User should be able to just call
//new Grid()
//Grid should be a pseudoclassical system
//eventually, grids will be held in the timeline.
// Grid = function (){
	// this.notes = [ , , , , , , , , ,...]
	//Notes, should be an mxn matrix representing the time differences and pitches.  m represents time,
	//n, represents pitch.
	// this.instrument = instrument;
	// this.instruments = [piano, acoustic ... etc.
	// within each instrument, we need to have an object or array of characteristics.  Should we make instruments
	// a class within this class?  Not a subclass, but a class that is stored in these classes?


	// this.currentTempo = currentTempo
	// need to figure out a tempo structure.
// }



// This function can be built for scaleing.
// I also feel like this function wll be reference in the main.js file when defining a new grid.
// the function below should call this.rows, this.cols
// test
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

// these params should mostly be accessible from the Grid instantiation.
// the function should not be playSounds...
// Instead, the interface should simply call:
// playSound(m,n)... m and n represent the matrix coordinates.
// all the other variables are already represented in the class instantiation.
// osc. sshould be an instance...
// we can also modularize this code.  Below is a decay and attack function.  We should seperate these functions
// out.  Again, they should be a prototype function, otherwise we're being sloppy and repeating code.
//Also, we need to establish a system that plays the sounds on a scale and on a consistent chord.
// we also need to include a note-to-frequency conversion equation.


// too many params for an interative function
// intsrument should have this as a method
///
///

var InitializeSound(){


}

var playSounds = function(SoundProfile, Modules, frequency, volume, sampleRate, duration, start){
  var amplitude;
  var attackLen = sampleRate * SoundProfile.attack();
  var buffer = context.createBuffer(1, duration * sampleRate, sampleRate);
  var data = buffer.getChannelData(0);

  for (i = 0; i < data.length; i++){
    if ( i < attackLen){
      amplitude = volume * (i/(sampleRate * SoundProfile.attack()))
    }else{
      amplitude = volume * Math.pow((1-((i-(sampleRate*SoundProfile.attack()))/(sampleRate*(duration-SoundProfile.attack())))),SoundProfile.dampen(sampleRate, frequency, volume))
    }
    val = amplitude * SoundProfile.wave(i, sampleRate, frequency, volume);
    data[i<<1] = val;
    data[(i<<1)+1] = val>> 8;
  }

  var osc = context.createBufferSource();
  var gainNode = context.createGain();

  // fancy word for volume
  gainNode.gain.value = 1;

  osc.buffer = buffer;
  // turn off to call once // turn off the 's' from the function (see below)
  osc.loop = false;
  osc.connect(context.destination);

  //play sound after start time
  osc.noteOn(start);
};

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

//Again, I think these will be great functions for the library... but these are probably not needed for
// our library.


var Sound = function(source){
  getSound(source, this);
};

Sound.prototype.play = function(){
  playNote(this.sound);
};


// this function should be the function that actually runs and maintains the current notes.
// it will need to reference the current notes object in the main file.
// it should use context.currentTime to schedule...
// if there is an 8x8 grid, we will just follow this equation:
// time values = 8t + gridNumber
// or schedule time is  Math.floor(context.currentTime/gridNumbers) + gridNumber
// Again, this function should be modular and work fluidly with the class system.
// values below should be grid ( this.x, this.y )
// Should reference tempo, and 44100, 1, etc. should not be hardcoded.
// playSounds ( soundProfile, Modules, keys[key], volume, sampleSize, duration, current/grid[0].length)
// See playLoop code to see how we can simplify play Sounds even more

// builds main grid ( 1st implementation)
// var mainGrid = grid( 8, 8 );

// // starts grid run
// // feels clunky and dumb
// var run = function(grid){
//   for ( var current = 0; current < grid[0].length; current++ ){
//     for (var key = 0; key < grid.length; key++){
//       if ( grid[key][current] ){
//         playSounds( SoundProfile, Modules, keys[key], 1, 44100, 1, current / grid[0].length );
//       }
//     }
//   }
// };

// // hard key assignment, lame, but quick;
// var keys = [100, 200, 300, 400, 500, 600, 700, 800];

// [[0,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0]]
// keysNum  = row.length

// angular should be able to turn these keys on/off on click.
// ng-repeat make toggleable buttons (change 0 to 1)
