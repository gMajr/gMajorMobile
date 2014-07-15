SoundBoard.prototype.toggle = function(row, col){
	row = row - 1;
	col = col - 1;
	if (this.noteScheduler[col][this.keys[row]]){
	 delete this.noteScheduler[col][this.keys[row]];
	}else{
	 this.noteScheduler[col][this.keys[row]] = true;
	}
};