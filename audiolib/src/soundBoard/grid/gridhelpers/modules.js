SoundBoard.prototype.modules = [
 function(i, sampleRate, frequency, x) {
   return 1 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 1 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 1 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 1 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 1 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
 },
 function(i, sampleRate, frequency, x) {
   return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
 }
];