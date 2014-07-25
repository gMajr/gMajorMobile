// In this library, we have a soundBoard which holds multiple grids.  Each grid represents an instrument
// and a grid interval in our app.  All the grids are stored in SoundBoard's grid array

var SoundBoard = function(gridInformation){

	this.Grids = [];
	// the interval will be filled in at a later time within the
	// 'playInterval' funciton
	this.interval;
//If gridInformation is passed into this function, it will build all the grids and the sounds necessary
//to loop through and play each of the grids.

	if ( gridInformation ){

		for ( var i = 0; i < gridInformation.length; i++){

			var instrument = gridInformation[i].instrument;
			var BPM = gridInformation[i].BPM;
			var freq = gridInformation[i].freq;
			var noteScheduler = gridInformation[i].noteScheduler;

//BPM represents beats-per-minute.  If you have 60 BPM, then you divide by 60 to get a beat-per-second.  
//In music, this means you will have two sounds to each beat, or a sound every .5 seconds.
//We've set the default BPM in our app to 120 BPMs, but you may definitely change it.

			if ( i === 0 ){
				this.BPM = BPM;
			}

			this.Grids.push(new Grid(instrument, BPM, freq, noteScheduler));
		}
	}
};

