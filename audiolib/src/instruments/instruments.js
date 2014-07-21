// Here, we are creating a global object called instruments.  The code to make the instrument
// sounds is contained here.  Attack is the time that it takes for the instrument to fade in 
// (typically .002 seconds).  Decay reflects the behavior of how the sound dies or silences over
// time.
// For a good reference on the equations below, please check out the following page.
// This website gives a step-by-step guide on similar code.  I give 100% credit to the owner
// of this page for the following equations.
// http://keithwhor.com/music/
// All the sounds are synthesized, which gives a lot of flexibility.  This library can produce these sounds
// at ANY frequency, and any BPM
// The wave equations represent the diferent shifted waves that make up the sounds.  These are basically
// Fourier coefficients

var instruments = 
{

 piano: {
   attack: function() { return 0.002; },
   dampen: function(sampleRate, frequency, volume) {
     return Math.pow(0.5*Math.log((frequency*volume)/this.sampleRate),2);
   },
   wave: function(i, sampleRate, frequency, volume) {
     var base = this.modules[0];
     return this.modules[1].call(this,
       i,
       sampleRate,
       frequency,
       Math.pow(base(i, this.sampleRate, frequency, 0), 2) +
       (0.75 * base(i, this.sampleRate, frequency, 0.25)) +
       (0.1 * base(i, this.sampleRate, frequency, 0.5))
     );  
   }
 },
  
 organ: {
  attack: function() { return 0.3 },
  dampen: function(sampleRate, frequency) { return 1+(frequency * 0.01); },
  wave: function(i, sampleRate, frequency) {
    var base = this.modules[0];
    return this.modules[1](
      i,
      this.sampleRate,
      frequency,
      base(i, this.sampleRate, frequency, 0) +
        0.5*base(i, this.sampleRate, frequency, 0.25) +
        0.25*base(i, this.sampleRate, frequency, 0.5)
    );
  }
 },

 acoustic: {
  attack:  function() { return 0.002; },
  dampen: function() { return 1; },
  wave: function(i, sampleRate, frequency) {

    var vars = this.vars;
    vars.valueTable = !vars.valueTable?[]:vars.valueTable;
    if(typeof(vars.playVal)=='undefined') { vars.playVal = 0; }
    if(typeof(vars.periodCount)=='undefined') { vars.periodCount = 0; }

    var valueTable = vars.valueTable;
    var playVal = vars.playVal;
    var periodCount = vars.periodCount;

    var period = this.sampleRate/frequency;
    var p_hundredth = Math.floor((period-Math.floor(period))*100);

    var resetPlay = false;

    if(valueTable.length<=Math.ceil(period)) {

      valueTable.push(Math.round(Math.random())*2-1);

      return valueTable[valueTable.length-1];

    } else {

      valueTable[playVal] = (valueTable[playVal>=(valueTable.length-1)?0:playVal+1] + valueTable[playVal]) * 0.5;

      if(playVal>=Math.floor(period)) {
        if(playVal<Math.ceil(period)) {
          if((periodCount%100)>=p_hundredth) {
            // Reset
            resetPlay = true;
            valueTable[playVal+1] = (valueTable[0] + valueTable[playVal+1]) * 0.5;
            vars.periodCount++;  
          }
        } else {
          resetPlay = true;  
        }
      }

      var _return = valueTable[playVal];
      if(resetPlay) { vars.playVal = 0; } else { vars.playVal++; }

      return _return;

    }
  }
 },

 edm: {
  attack:  function() { return 0.002; },
  dampen: function() { return 1; },
  wave: function(i, sampleRate, frequency) {
    var base = this.modules[0];
    var mod = this.modules.slice(1);
    return mod[0](
      i,
      this.sampleRate,
      frequency,
      mod[8](
        i,
        this.sampleRate,
        frequency,
        mod[2](
          i,
          this.sampleRate,
          frequency,
          Math.pow(base(i, this.sampleRate, frequency, 0), 3) +
            Math.pow(base(i, this.sampleRate, frequency, 0.5), 5) +
            Math.pow(base(i, this.sampleRate, frequency, 1), 7)
        )
      ) +
        mod[7](
          i,
          this.sampleRate,
          frequency,
          base(i, this.sampleRate, frequency, 1.75)
        )
    );
  }
 }
}


