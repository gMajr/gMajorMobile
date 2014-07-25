angular.module('gmajor.gameGridFactory', [])

.factory('GameGridFactory', function(){

  // defines spacing for a well-balanced grid
  // of a single size (not dynamic with respect to M or N)
  var iPhoneSVGWidth = 298;
  var nMax = 8;
  var mMax = 6;
  var targetSize = 16; // Size of touch target in SVG pixels
  var initCirR = 4;
  var selectedCirR = 12;
  var nSpacingOffset = Math.floor(298/(nMax+1));
  var mSpacingOffset = Math.floor(298/(mMax+1));
  // ideally, this would be made dynamic down the line.
  var BPM = '100';

  var columns = [];

  // matrix builder
  // requires a grid to bind updates to
  var newMatrix = function(grid) {
    var matrix = {};
    matrix.BPM = '100';
    matrix.grid = grid;
    matrix.matrix = makeMatrix(matrix.grid);
    return matrix;
  }

  // generate an m x n collection of target objects
    // Associate a row and column with each object
    // Generate the svg pixel offset for placing the target on the screen
    // Add a clickToggle function
    // There are two targets:
    // 1. a cicle with properites x, y, & circleR that indicates the target state
    // 2. an invisible rectangle overlayed onto them that recieves the click / touch events
    //    and acts as a bigger touch target. (rectY, rectY, rectHeight, & rectWidth)

  var makeMatrix = function(grid) {
    var columns = [];
    var numColumns = grid.noteMatrix.length;

    // toggle updates the matrix (view) and the grid (music)
    var clickToggle = function(silent) {
      grid.toggle(this.col, this.row);
      if (this.toggleState === 'off') {
        if (!silent) {
          // play the sound
          grid.playSounds(grid.keys[this.row], 1, 0);
        }
        // update the view
        this.circleR = selectedCirR;
        this.toggleState = 'on';
      } else {
        this.circleR = initCirR;
        this.toggleState = 'off';
      }
    };

    // build the matrix
    for(var n = 0; n < numColumns; n++) {
      var currColumn = [];
      currColumn.activeClass = undefined;
      for(var m = 0; m < mMax; m++) {
        var newTarget = {
          col: n,
          row: m,
          x: (n + 1) * nSpacingOffset,
          y: (m + 1) * mSpacingOffset,
          rectX: ((n + 1) * nSpacingOffset) - targetSize,
          rectY: ((m + 1) * mSpacingOffset) - targetSize,
          rectWidth: targetSize * 2,
          rectHeight: targetSize * 2,
          circleR: initCirR,
          toggleState: 'off',
          column: currColumn,
          clickToggle: clickToggle
        };
        currColumn.push(newTarget);
      }
      columns.push(currColumn);
    };

    return columns;

  };
  

  return {
    'newMatrix': newMatrix
  };

});
