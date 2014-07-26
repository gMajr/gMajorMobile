//This function plays a sound from the last item in the grid.  The last item in the grid will
//always be the grid that the user is playing wth.

SoundBoard.prototype.playSounds = function( frequencyOrSound, volume, start){
  //The currentBoard is the board that the user will currently be working with.  It will allways
  //be the last board in the Grids array
  var currentBoard = this.Grids[this.Grids.length -1];
  //This is the duration of the sound
  var duration = 60/currentBoard.BPM/2;
  //The sound data, PCM data is stored in a buffer.
  var osc = context.createBufferSource();
  //The gain node lets you alter the volume of the sound
  var gainNode = context.createGain();
  gainNode.gain.value = volume;
  //here, we look to our soundhash table to get the sound data and play it.
  var buffer = currentBoard.soundHash[frequencyOrSound];
  osc.buffer = buffer;
  //if this is not set to false, then the sound will continue to loop and play.
  osc.loop = false;

  //Here, you connect the sound to the gain node.  The gain node acts as a processing filter and 
  //can make the sound louder or quieter.  It is simply volume.
  osc.connect(gainNode);
  //Connect the gain node to the speaker.  context.destination represents the computer speakers.
  //the web audio API has a precise timer that will play a sound whenever you schedule it for. 
  //context.currentTime gives you the current time.  If you give a time that is in the past, then 
  //it will play immediately.
  gainNode.connect(context.destination);
  osc.start(start);
};