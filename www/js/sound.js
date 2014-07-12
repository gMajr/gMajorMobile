

var playSound = function(instrument, frequency){

};

var scheduleSound = function(){

}







var SoundProfile = {
  name: 'piano',
  attack: function() { return 0.002; },
  dampen: function(sampleRate, frequency, volume) {
    return Math.pow(0.5*Math.log((frequency*volume)/sampleRate),2);
  },
  wave: function(i, sampleRate, frequency, volume) {
    var base = Modules[0];
    return Modules[1](
      i,
      sampleRate,
      frequency,
      Math.pow(base(i, sampleRate, frequency, 0), 2) +
        (0.75 * base(i, sampleRate, frequency, 0.25)) +
        (0.1 * base(i, sampleRate, frequency, 0.5))
    );
  }
};

// I have no idea what these do
Modules = [
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
