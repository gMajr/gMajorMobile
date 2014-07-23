SoundBoard.prototype.addGrid = function( grid ){
	this.Grids.push( grid );
	this.BPM = grid.BPM;
};

SoundBoard.prototype.removeGrid = function( grid ){
  return this.Grids.pop();
};
