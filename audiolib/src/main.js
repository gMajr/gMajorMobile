//This sets up the audio context.  This code must run in order to activate the web audio API

window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();
