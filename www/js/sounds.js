window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();

var SoundBoard = function(){

	//the sound hash holds previously calculated buffers.  In this case, we won't have to go through
	// an array that spans 44,100 elements again.

  this.sampleRate = 44100;

	this.soundHash = {};

	this.modules = [
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
  }
	];
	this.Instruments = {
	  piano: {
		  attack: function() { return 0.002; },
		  dampen: function(sampleRate, frequency, volume) {
	    return Math.pow(0.5*Math.log((frequency*volume)/this.sampleRate),2);
	  	},
		  wave: function(i, sampleRate, frequency, volume) {

		    var base = this.modules[0];
		    if ( i === 4 )
		    	console.log(base);
		    return this.modules[1].call(this,
	        i,
		      sampleRate,
		      frequency,
		      Math.pow(base(i, this.sampleRate, frequency, 0), 2) +
	        (0.75 * base(i, this.sampleRate, frequency, 0.25)) +
	        (0.1 * base(i, this.sampleRate, frequency, 0.5))
	   		);  
	  	}
	  }}

// These functions shift, add noise, and character to the waveforms.  As a result, the instrument
// sounds more realistic

}
//Sample rate represents the array size that stores the amplitudes of the sound for the web Audio API.
//the this.sampleRate should automatically be set to 44100 since most computer sound cards will be running
//at this spec
//Volume is on a scale from 0 to 1

SoundBoard.prototype.playSounds = function(Instrument, frequency, volume, duration, start){
  var attackLen = this.sampleRate * this.Instruments[Instrument].attack();
  //The web audio API contains buffers that can be evaluated as sound.  Below, we will fill this buffer
  //for the sound card to evaluate
  var buffer = context.createBuffer(1, duration * this.sampleRate, this.sampleRate);
  var osc = context.createBufferSource();
  var gainNode = context.createGain();
  gainNode.gain.value = volume;

  //We produce sound in just one channel.  Most soundtracks will hold sound in two channels, hence
  //the fact that you hear two sounds in each ear.

  //The code below represents the attack and decay functions for the wave.  A logarithmic/exponential
  //function is used for the decay. This gives the effect of lower notes lasting longer than
  //higher notes.  Pretty cool!!!
  if (this.soundHash[Instrument] && this.soundHash[Instrument][frequency] && this.soundHash[Instrument][frequency][duration]){
  	buffer = this.soundHash[Instrument][frequency][duration]
  }else{
  	data = buffer.getChannelData(0);
    for (i = 0; i < data.length; i++){
	    if ( i < attackLen){
	      amplitude = volume * (i/(this.sampleRate * this.Instruments[Instrument].attack()))
	    }else{
	      amplitude = volume * Math.pow((1-((i-(this.sampleRate*this.Instruments[Instrument].attack()))/(this.sampleRate*(duration-this.Instruments[Instrument].attack())))),this.Instruments[Instrument].dampen.call(this,this.sampleRate, frequency, volume))
	    }
	      val = amplitude * this.Instruments[Instrument].wave.call(this, i, this.sampleRate, frequency, volume);
	      if ( i === 4)
	      	console.log(amplitude);
   			data[i<<1] = val;
    		data[(i<<1)+1] = val>> 8;

  	}
  	if (!this.soundHash[Instrument]){
  		this.soundHash[Instrument] = {};
  	}
  	if (!this.soundHash[Instrument][frequency]){
  		this.soundHash[Instrument][frequency] = {};
  	}
  	this.soundHash[Instrument][frequency][duration] = buffer;
  }

  //If you have quesitons on this function, let me know.  Otherwise, you won't need to alter it at all.
  //Think of the web Audio API as a simple instrument to speaker connection.  The source(buffer source),
  //acts like the guitar.  The context.destination is the speaker (see below).  Otherwise,
  //all the nodes in-between would be like a filter, or pedal you might connect to an electric guitar.
  osc.buffer = buffer;
  osc.loop = false;
  osc.connect(context.destination);
  osc.noteOn(start);
}
