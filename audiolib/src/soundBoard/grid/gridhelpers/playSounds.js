Grid.prototype.playSounds = function( frequencyOrSound, volume, start){
 var duration = 60/this.BPM/2;
 var osc = context.createBufferSource();
 var gainNode = context.createGain();
 gainNode.gain.value = volume;

 var buffer = this.soundHash[frequencyOrSound];
 osc.buffer = buffer;
 osc.loop = false;
 osc.connect(gainNode);
 gainNode.connect(context.destination);
 osc.start(start);
};