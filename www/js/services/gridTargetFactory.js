angular.module('gmajor.gridTargetFactory', [])

.factory('GridTargetFactory', function(){
  var iPhoneSVGWidth = 298;
  var nMax = 8;
  var mMax = 6;
  var targetSize = 16; // Size of touch target in SVG pixels
  var initCirR = 4;
  var selectedCirR = 12;
  var nSpacingOffset = Math.floor(298/(nMax+1));
  var mSpacingOffset = Math.floor(298/(mMax+1));

  var columns = [];
  var soundBoard = new SoundBoard(piano, 90, 329.63);
  // generate an m x n collection of target objects
    // Associate a row and column with each object
    // Generate the svg pixel offset for placing the target on the screen
    // Add a clickToggle function
    // There are two targets:
    // 1. a cicle with properites x, y, & circleR that indicates the target state
    // 2. an invisible rectangle overlayed onto them that recieves the click / touch events
    //    and acts as a bigger touch target. (rectY, rectY, rectHeight, & rectWidth)
  for(var n = 0; n < nMax; n++) {
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
        clickToggle: function() {
          soundBoard.toggle(this.col, this.row);
          if (this.toggleState === 'off') {
            soundBoard.playSounds(soundBoard.keys[this.row], 1, 0);
            this.circleR = selectedCirR;
            this.toggleState = 'on';
          } else {
            this.circleR = initCirR;
            this.toggleState = 'off';
          }
        }
      };
      currColumn.push(newTarget);
    }
    columns.push(currColumn);
  }



  // return as array of arrays in column, row order.

  return {
    'columns': columns,
    'play': soundBoard.playInterval.bind(soundBoard),
    'stop': soundBoard.stopSounds.bind(soundBoard)
  };
});
