var SoundBoard = function(ImportedJSON){

	gridInformation = JSON.parse(ImportedJSON);
	this.Grids = [];
	
	for ( var i = 0; i < gridInformation.length; i++){

		var instrument = gridInformation[i][instrument];
		var BPM = gridInformation[i][BPM];
		var freq = gridInformation[i][freq];
		var noteScheduler = gridInformation[i][noteScheduler];

		this.Grids.push(new Grid(instrument, BPM, freq, noteScheduler));
	}
};