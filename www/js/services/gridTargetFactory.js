angular.module('gmajor.gridTargetFactory', [])

.factory('GridTargetFactory', function(){
  var iPhoneSVGWidth = 298;
  var nMax = 8;
  var mMax = 8;
  var targetSize = 16; // Size of touch target in SVG pixels
  var initCirR = 4;
  var selectedCirR = 12;
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
          if (this.toggleState === 'off') {
            play();
            this.circleR = selectedCirR;
            this.toggleState = 'on';
            if (!this.column.activeClass){
              this.column.activeClass = "colActive"
            }
          } else {
            this.circleR = initCirR;
            this.toggleState = 'off';
            this.column.activeClass = undefined;
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
    'play': play
  };
});
