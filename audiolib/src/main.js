window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();

var SoundBoard = function(instrument, BPM, freq){
 this.sampleRate = 44100;
 this.BPM = BPM;
 this.instrument = instrument;

 this.interval;
 this.noteScheduler = (function(){
   var temp = [];
   for ( var i = 0; i < 8; i++ ){
     temp.push({});
   }
   return temp;
 })();

 this.keys = scale = (function(){
   return [ freq, 9/8 * freq, 5/4 * freq,
     3/2 * freq, 5/3 * freq, 2 * freq ].reverse();
 })();

 this.soundHash = {};

 //first line of instrument edits
 var attackLen = this.sampleRate * this.instrument.attack();
 var duration = 60/this.BPM/2;
 var volume = 1;

 //this stores the sounds for later use
 for ( var i = 0; i < scale.length; i++ ){
   var buffer = context.createBuffer(1, duration * this.sampleRate, this.sampleRate);
   var frequency = scale[i];
   data = buffer.getChannelData(0);
   for (var j = 0; j < data.length; j++){
     if ( j < attackLen){
       amplitude = volume * (j/(this.sampleRate * this.instrument.attack()))
     }else{
       amplitude = volume * Math.pow((1-((j-(this.sampleRate*this.instrument.attack()))/(this.sampleRate*(duration-this.instrument.attack())))),this.instrument.dampen.call(this,this.sampleRate, frequency, volume))
     }
       val = amplitude * this.instrument.wave.call(this, j, this.sampleRate, frequency, volume);
       data[j<<1] = val;
       data[(j<<1)+1] = val>> 8;
   }
   this.soundHash[ scale[i] ] = buffer;
 }
};

