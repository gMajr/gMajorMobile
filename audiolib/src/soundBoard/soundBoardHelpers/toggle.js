SoundBoard.prototype.toggle = function(col, row){
	var amountOfGrids = this.Grids.length -1;
	currentBoard = this.Grids[amountOfGrids];
	if (parseInt(currentBoard.keys[row]) in currentBoard.noteScheduler[col]){
	 delete currentBoard.noteScheduler[col][parseInt(currentBoard.keys[row])];
	}else{
	 currentBoard.noteScheduler[col][parseInt(currentBoard.keys[row])] = currentBoard.keys[row];
	}
};


