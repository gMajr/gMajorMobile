Grid.prototype.toggle = function(col, row){
	if (parseInt(this.keys[row]) in this.noteScheduler[col]){
	 delete this.noteScheduler[col][parseInt(this.keys[row])];
	}else{
	 this.noteScheduler[col][parseInt(this.keys[row])] = this.keys[row];
	}
};