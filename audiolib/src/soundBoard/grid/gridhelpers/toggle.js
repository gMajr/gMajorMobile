

Grid.prototype.toggle = function(col, row){

	//There is a special case if we're toggling the drum sounds.  Instead of frequency numbers, we play 
	//sound names.  ie. 'hh', 'kick', 'synrider'.  Wherease the synthesized sounds are called 
	//by numbers. ie. 373.2, 478 Hz, etc.

	//The keys, or specific frequencies are stored in a keys array
	if ( this.instrumentName === 'drums' ){
		if( this.keys[row] in this.noteScheduler[col]){
			delete this.noteScheduler[col][this.keys[row]];
			this.noteMatrix[col][row] = 0;
		}else{
			this.noteScheduler[col][this.keys[row]] = this.keys[row];
			this.noteMatrix[col][row] = 1;
		}
	}else{		
		//we had to put a number without a decimal as a key.  A decimal in the key will not work with 
		//mongodb.  In this case we give an integer as the key, and the full decimal frequency as the value.
		
		if (parseInt(this.keys[row]) in this.noteScheduler[col]){
		 	delete this.noteScheduler[col][parseInt(this.keys[row])];
			this.noteMatrix[col][row] = 0;
		}else{
		 	this.noteScheduler[col][parseInt(this.keys[row])] = this.keys[row];
			this.noteMatrix[col][row] = 1;
		}
	}

};
