var Sound = function(source){
  getSound(source, this);
};

Sound.prototype.play = function(){
  playNote(this.sound);
};