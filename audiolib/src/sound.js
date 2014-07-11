//Again, I think these will be great functions for the library... but these are probably not needed for
// our library.


var Sound = function(source){
  getSound(source, this);
};

Sound.prototype.play = function(){
  playNote(this.sound);
};