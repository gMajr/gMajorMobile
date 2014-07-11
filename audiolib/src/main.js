// set up grid context
window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();
//Need to build a pseudoclassical system.  User should be able to just call
//new Grid()
//Grid should be a pseudoclassical system
//eventually, grids will be held in the timeline.
// Grid = function (){
	// this.notes = [ , , , , , , , , ,...]
	//Notes, should be an mxn matrix representing the time differences and pitches.  m represents time, 
	//n, represents pitch.  
	// this.instrument = instrument;
	// this.instruments = [piano, acoustic ... etc.
	// within each instrument, we need to have an object or array of characteristics.  Should we make instruments
	// a class within this class?  Not a subclass, but a class that is stored in these classes?

	
	// this.currentTempo = currentTempo
	// need to figure out a tempo structure.
// }

