SoundBoard.prototype.playInterval = function(){
 var startTime = context.currentTime;
 var halfwayPointBetweenNotes = 60/this.BPM/2/2;
 var MIDI = this.noteScheduler;

 var continuedLoop = function( MIDI, startTime, k ){
   var currentTime = context.currentTime;
   var currentCol = Math.ceil((currentTime - startTime)/(60/this.BPM/2)%8)-1;
   var numberOfCycles = Math.floor((currentTime - startTime)/(60/this.BPM/2*8))
   var scheduledTime = ((numberOfCycles * ( 60/this.BPM/2 * 8 )) + startTime + ((currentCol + 1) * 60/this.BPM/2))
   for (var note in this.noteScheduler[currentCol]){
     if ( this.noteScheduler[currentCol][note] ){
       this.playSounds( note, 1, scheduledTime )
     }
   }
   loop.call( this, MIDI, startTime, halfwayPointBetweenNotes, continuedLoop, (scheduledTime - context.currentTime + halfwayPointBetweenNotes), k);
 };

 var loop = function( MIDI, startTime, halfwayPointBetweenNotes, continuedLoop, firstTime , k){
   k = k || 0;
   k++;
   firstTime = firstTime || 0;
   this.interval = setTimeout( continuedLoop.bind(this, MIDI, startTime, k), firstTime * 1000 );
 }
 if (!context.currentTime){
   this.playSounds(this.keys[0], 0, 0);
 }
 loop.call( this, MIDI, startTime, halfwayPointBetweenNotes, continuedLoop );
};