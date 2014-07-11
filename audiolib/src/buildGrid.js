var grid = function(rows, cols){
  var result = [];
  for ( var i = 0; i < rows; i++ ){
    result.push([]);
    for ( var j = 0; j < cols; j++ ){
      result[i][j] = 0;
    }
  }
  return result;
};