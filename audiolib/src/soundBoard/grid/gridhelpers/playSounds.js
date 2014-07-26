Grid.prototype.playSounds = function( frequencyOrSound, volume, start, visualizer ){
	// See the commented code in soundBoard.  This is essentially the same function.  The code in soundboard just
	// applies this code to the currentGrid. There is additional documentation here regarding the visualizer
  // which is connected to the sound buffer below and renders the data in audioVisulizer.js.
  var duration = 60 / this.BPM / 2;
  var osc = context.createBufferSource();
  var gainNode = context.createGain();
  var instrument = this.instrumentName;
  var buffer = this.soundHash[frequencyOrSound];

  // Create an analyser node that will collect played sound data. The analyser is only used for
  // gathering sound data and has no impact on the audio input or output.
  var analyserNode = context.createAnalyser();
  // Set default visualizer value to true. Variable determines whether to launch visualizer.
  var visualizer = visualizer || true;
  
  osc.buffer = buffer;
  osc.loop = false;
  gainNode.gain.value = volume;

  // Connect the sound to the analyser node. The analyser node simply sits between the sound and the
  // destination (speakers) and reports the data when a sound is played. It does not effect sound 
  // input or output.
  osc.connect(analyserNode);
  // Next connect the analyser node to the gain node. The gain node acts as a processing filter and 
  // can make the sound louder or quieter. It is simply volume.
  analyserNode.connect(gainNode);
  // Finally connect the gain node to the speaker. We have effectively linked the sound buffer to
  // the speaker while wiring the sound analyser in between the sources to collect sound data.
  gainNode.connect(context.destination);

  osc.start(start);

  // Launch the audio visualizer unless it has been disabled.
  visualizer && this.audioVisualizer(analyserNode, instrument)
};