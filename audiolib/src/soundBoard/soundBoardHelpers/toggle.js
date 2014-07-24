

SoundBoard.prototype.toggle = function(col, row){

	var amountOfGrids = this.Grids.length -1;
	//There is a special case if we're toggling the drum sounds.  Instead of frequency numbers, we play 
	//sound names.  ie. 'hh', 'kick', 'synrider'.  Wherease the synthesized sounds are called 
	//by numbers. ie. 373.2, 478 Hz, etc.

	currentBoard = this.Grids[amountOfGrids];
	//current grid is always the last grid in the Grids array.
	//The keys, or specific frequencies are stored in a keys array
	if ( currentBoard.instrumentName === 'drums' ){
		if( currentBoard.keys[row] in currentBoard.noteScheduler[col]){
			delete currentBoard.noteScheduler[col][currentBoard.keys[row]];
			currentBoard.noteMatrix[col][row] = 0;
		}else{
			currentBoard.noteScheduler[col][currentBoard.keys[row]] = currentBoard.keys[row];
			currentBoard.noteMatrix[col][row] = 1;
		}
	}else{		
		//we had to put a number without a decimal as a key.  A decimal in the key will not work with 
		//mongodb.  In this case we give an integer as the key, and the full decimal frequency as the value.
		
		if (parseInt(currentBoard.keys[row]) in currentBoard.noteScheduler[col]){
		 	delete currentBoard.noteScheduler[col][parseInt(currentBoard.keys[row])];
			currentBoard.noteMatrix[col][row] = 0;
		}else{
		 	currentBoard.noteScheduler[col][parseInt(currentBoard.keys[row])] = currentBoard.keys[row];
			currentBoard.noteMatrix[col][row] = 1;
		}
	}

};


