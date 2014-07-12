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

// var InitializeSound(){


// }

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
