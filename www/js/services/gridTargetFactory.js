angular.module('gmajor.gridTargetFactory', [])

.factory('GridTargetFactory', function(){
  var iPhoneSVGWidth = 298;
  var nMax = 8;
  var mMax = 8;
  var nSpacingOffset = Math.floor(298/(nMax+1));
  var mSpacingOffset = Math.floor(298/(mMax+1));

  var columns = [];
  var soundBoard = new SoundBoard()
  var play = function(){
    // add note to grid
    // makes any noise
    soundBoard.playSounds('piano', 400, 1, 1, 0);
  };
  // generate an m x n collection of target objects
    // Associate a row and column with each object
    // Generate the svg pixel offset for placing the target on the screen
    // Add a clickToggle function
  for(var n = 0; n < nMax; n++) {
    var currColumn = [];
    for(var m = 0; m < mMax; m++) {
      var newTarget = {
        col: n,
        row: m,
        x: (n + 1) * nSpacingOffset,
        y: (m + 1) * mSpacingOffset,
        clickToggle: function() {
          // alert("Click button: " + this.col + " x " + this.row);
          play();

        }
      };
      currColumn.push(newTarget);
    }
    columns.push(currColumn);
  }



  // return as array of arrays in column, row order.

  return {
    'columns': columns,
    'play': play
  };
});
