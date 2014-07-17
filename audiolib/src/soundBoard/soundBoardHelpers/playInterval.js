SoundBoard.prototype.playInterval = function( cb ){

 var startTime = context.currentTime;
 var halfwayPointBetweenNotes = 60/this.BPM/2/2;

 var continuedLoop = function( startTime, k ){
   
   var currentTime = context.currentTime;
   var currentCol = Math.ceil((currentTime - startTime)/(60/this.BPM/2)%8)-1;
   var numberOfCycles = Math.floor((currentTime - startTime)/(60/this.BPM/2*8))
   var scheduledTime = ((numberOfCycles * ( 60/this.BPM/2 * 8 )) + startTime + ((currentCol + 1) * 60/this.BPM/2))

   for ( var i = 0; i < this.Grids.length; i++ ){
	   for ( var note in this.Grids[i].noteScheduler[currentCol] ){
	       this.Grids[i].playSounds( note, 1, scheduledTime )
	   }
   }
	
   if ( cb ){
      var time = scheduledTime - context.currentTime;
      setTimeout(function(){cb(currentCol)}, time);
   }
   
   loop.call( this, startTime, halfwayPointBetweenNotes, continuedLoop, (scheduledTime - context.currentTime + halfwayPointBetweenNotes), k);
 };

 var loop = function( startTime, halfwayPointBetweenNotes, continuedLoop, firstTime , k){

   k = k || 0;
   k++;

   firstTime = firstTime || 0;
   this.interval = setTimeout( continuedLoop.bind(this, startTime, k), firstTime * 1000, 2, cb );
 }
 if (!context.currentTime){
   this.Grids[0].playSounds(this.Grids[0].keys[0], 0, 0);
 }
 loop.call( this, startTime, halfwayPointBetweenNotes, continuedLoop);

};