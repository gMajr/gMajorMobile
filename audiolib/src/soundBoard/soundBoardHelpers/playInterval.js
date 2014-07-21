SoundBoard.prototype.playInterval = function( cb ){
//The callback is what is used to keep track of when a column is active
 var startTime = context.currentTime;
 //we begin the timer immediately
 var halfwayPointBetweenNotes = 60/this.BPM/2/2;
 //I define a time halfway between the notes.  It is at this point in time that I schedule the next 
 //set of sounds

 var continuedLoop = function( startTime, k ){
   
   var currentTime = context.currentTime;
   var currentCol = Math.ceil((currentTime - startTime)/(60/this.BPM/2)%8)-1;
   var numberOfCycles = Math.floor((currentTime - startTime)/(60/this.BPM/2*8))
   var scheduledTime = ((numberOfCycles * ( 60/this.BPM/2 * 8 )) + startTime + ((currentCol + 1) * 60/this.BPM/2))
   //These functions keep track of the current time.  With respect to the current time, the current
   //column can be calculated.  Number of cycles tells you how many times you have looped through the grid
   //the scheduled time is the precise time when the next set of notes need to be played
   for ( var i = 0; i < this.Grids.length; i++ ){
	   for ( var note in this.Grids[i].noteScheduler[currentCol] ){
	       this.Grids[i].playSounds( this.Grids[i].noteScheduler[currentCol][note], 1, scheduledTime )
	   }
   }
	//in this for loop, we go through the note schduler in EVERY grid that exists on the soundBoard, and we
   //schedule the notes.

   //the callback is optional
   if ( cb ){
      var time = scheduledTime - context.currentTime;
      setTimeout(function(){cb(currentCol)}, time);
      //this calls the function that lights up the columns.
   }
   
   loop.call( this, startTime, halfwayPointBetweenNotes, continuedLoop, (scheduledTime - context.currentTime + halfwayPointBetweenNotes), k);
 };

 var loop = function( startTime, halfwayPointBetweenNotes, continuedLoop, firstTime , k){
// k is used for debugging.  I increment k for EVERY loop.
   k = k || 0;
   k++;

   firstTime = firstTime || 0;
//Set Timeout is not precise, but the web audio timer is EXTREMELY precise.  We schedule sounds with
//respect to the web audio timer.  This setTimeout is always self-correcting itself, so it will never
//be far off.  
   this.interval = setTimeout( continuedLoop.bind(this, startTime, k), firstTime * 1000);
 }
 if (!context.currentTime){
 //If the timer hasn't started, we start the timer by playing any sound.
   this.Grids[0].playSounds(this.Grids[0].keys[0], 0, 0);
 }
 loop.call( this, startTime, halfwayPointBetweenNotes, continuedLoop);

};