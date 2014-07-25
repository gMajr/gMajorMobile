//This sets up the audio context.  This code must run in order to activate the web audio API

window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();
