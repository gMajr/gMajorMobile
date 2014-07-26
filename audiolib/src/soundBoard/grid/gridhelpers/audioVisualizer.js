Grid.prototype.audioVisualizer = function(analyserNode, instrument) {
  // If there is a canvas element, launch the audio visualizer.
  if (document.getElementsByTagName('canvas').length > 0) {
    // Configure the sound analyser. 
    // Set the fft size to sample and display. Smooting constant takes a value from 0 to 1.
    analyserNode.fftSize = 1024;
    analyserNode.smoothingTimeConstant = 0;

    // We create a typed Array, specifically a Uint8Array to store our audio data. A Uint8Array 
    // can contain only unsigned 8-bit integers that have values between 0 and 255. We will use
    // this number range to model our sound frequencies. The unsigned array will have length 
    // half the fftSize (frequencyBinCount sets the array length and is half of fftSize).
    var frequencyBins = new Uint8Array(analyserNode.frequencyBinCount);

    // Set the canvas dimensions.
    var canvasWidth  = 298;
    var canvasHeight = 256;

    // Get the HTML5 canvas element. More info here:
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Canvas
    var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

    // Draws the frequency on the canvas. See polyfill in main.js.
    requestAnimFrame(drawFrequency);

    function drawFrequency() {
      // It takes a few moments for analyser to be populated with the current sound data.
      // Set timeout while the sound is being played so the data can be stored.
      // There might be a better way to do this, but this was the best solution I found for
      // dealing with the timelag in registering the data.
      setTimeout(function(){
        // Get frequency data stores the data in the frequencyBins array argument.
        analyserNode.getByteFrequencyData(frequencyBins);
        // Clear the canvas so we can redraw it below.
        clearCanvas();
        // Loop through each item in the frequencyBins array we just populated with data.
        for (var i = 0; i < frequencyBins.length; i++) {
          var value = frequencyBins[i];
          var percent = value / 256;

          // Sets the height, position and width of each visualizer bar.
          var height = canvasHeight * percent;
          var offset = canvasHeight - height - 1;
          var barWidth = canvasWidth/analyserNode.frequencyBinCount;

          // The properties of the audio elements are such that there are frequencies on the 
          // low and high end of the spectrum, but none in the middle (except for drums). Zoom
          // shows the begginning portion of the frequency in order to visualize the more interesting
          // data. Set to 1 to visualize the full range as we have with drums.
          var zoom;
          instrument === "drums" ? zoom = 1 : zoom = 8;

          // Sets the space ratio between bars.
          var spacing = zoom*0.75;
          // Sets the color range.
          var hue = i * zoom/analyserNode.frequencyBinCount * 360;

          // Set the canvas color and fill the canvas with rectangles for each visualizer bar.
          ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
          ctx.fillRect(i*zoom * barWidth, offset, barWidth*spacing, height);
        }
      }, 400)
    };

    // Clears the HTML5 canvas element.
    function clearCanvas() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    };
  }
}
