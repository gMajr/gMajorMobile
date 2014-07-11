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