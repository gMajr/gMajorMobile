SoundBoard.prototype.playSounds = function( frequencyOrSound, volume, start){

 var currentBoard = this.Grids[this.Grids.length -1];
 var duration = 60/currentBoard.BPM/2;
 var osc = context.createBufferSource();
 var gainNode = context.createGain();
 gainNode.gain.value = volume;
 var buffer = currentBoard.soundHash[frequencyOrSound];
 osc.buffer = buffer;
 osc.loop = false;
 osc.connect(gainNode);
 gainNode.connect(context.destination);
 osc.start(start);

};