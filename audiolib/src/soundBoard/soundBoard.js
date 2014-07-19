var SoundBoard = function(gridInformation){

	this.Grids = [];
	this.interval;

	if ( gridInformation ){

		for ( var i = 0; i < gridInformation.length; i++){

			var instrument = gridInformation[i].instrument;
			var BPM = gridInformation[i].BPM;
			var freq = gridInformation[i].freq;
			var noteScheduler = gridInformation[i].noteScheduler;

			if ( i === 0 ){
				this.BPM = BPM;
			}

			this.Grids.push(new Grid(instrument, BPM, freq, noteScheduler));
		}
	}
};

