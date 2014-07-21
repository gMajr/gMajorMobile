//This function exports the information for all the grids into an array.
//If you feed the exported grids data back into a new instance of a SoundBoard prototype, then it 
//will rebuild all the grids, and sounds

SoundBoard.prototype.exportGrids = function(){

	var exportedGrids = [];

	for ( var i = 0; i < this.Grids.length; i++ ){

		var data = {};
		var instrument = this.Grids[i].instrumentName;
		var BPM = this.Grids[i].BPM;
		var freq = this.Grids[i].freq;
		var noteScheduler = this.Grids[i].noteScheduler;

		data.instrument = instrument;
		data.BPM = BPM;
		data.freq = freq;
		data.noteScheduler = noteScheduler;

		exportedGrids.push(data);

	}

	return exportedGrids;

}