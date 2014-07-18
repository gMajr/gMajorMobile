Grid.prototype.toggle = function(col, row){
	if (this.noteScheduler[col][this.keys[row]]){
	 delete this.noteScheduler[col][this.keys[row]];
	}else{
	 this.noteScheduler[col][parseInt(this.keys[row])] = this.keys[row];
	}
};