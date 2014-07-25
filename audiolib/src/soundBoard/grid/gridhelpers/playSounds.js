Grid.prototype.playSounds = function( frequencyOrSound, volume, start ){
	//See the commented code in soundBoard.  This is essentially the same function.  The code in soundboard just
	//applies this code to the currentGrid.
  var duration = 60 / this.BPM / 2;
  var osc = context.createBufferSource();
  var gainNode = context.createGain();
  var instrument = this.instrumentName;
  gainNode.gain.value = volume;

  var buffer = this.soundHash[frequencyOrSound];
  osc.buffer = buffer;
  osc.loop = false;

  var analyserNode   = context.createAnalyser();
  analyserNode.smoothingTimeConstant = 0;
  analyserNode.fftSize = 1024;
  var frequencyBins = new Uint8Array(analyserNode.frequencyBinCount);

  osc.connect(analyserNode);
  analyserNode.connect(gainNode);
  gainNode.connect(context.destination);
  osc.start(start);

  // If there is a canvas element, launch the audio visualizer.
  if (document.getElementsByTagName('canvas').length > 0) {

    /***********************
    *** Audio Visualizer ***
    ************************/

    // Set the canvas dimensions.
    var canvasWidth  = 298;
    var canvasHeight = 256;

    // Get the HTML5 canvas element. More info here:
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Canvas
    ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

    // Draws the frequency on the canvas.
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

          // Set the canvas color and fill the canvas rectangle for each visualizer bar.
          ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
          ctx.fillRect(i*zoom * barWidth, offset, barWidth*spacing, height);
        }
      }, 400)
    };

    function clearCanvas() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    };
  }
};