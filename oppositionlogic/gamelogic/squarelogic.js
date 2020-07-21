

export class SquareCoordinate{
  constructor(Rank, File){
    this.Rank=Rank;
    this.File=File;
  }
}

export function squareName(column, rank){
    return String.fromCharCode("a".charCodeAt(0) + (column-1)) + rank.toString()
  }



export function select_goal_squares(){
    var rank = Math.floor((Math.random() * 3) + 6);
    var leftmost_column = Math.floor((Math.random() * 6) + 1);
    var l2 = leftmost_column+1
    var l3= leftmost_column+2
    return [squareName(leftmost_column, rank), squareName(l2, rank), squareName(l3, rank)]
  }


export function select_king_squares(){
  var rank = Math.floor((Math.random() * 3) + 1);
  var column = Math.floor((Math.random() * 8) + 1);

  var rank2 = Math.floor((Math.random() * 3) + 6);
  var column2 = Math.floor((Math.random() * 8) + 1);

  return [squareName(column, rank), squareName(column2, rank2)]
}

export function getKingLocation(curentGame){
  var TheWhiteKing = '';
  var BlackKing = '';

  curentGame.SQUARES.forEach(function (item, index) {
    //console.log(item, index);
    var square = curentGame.get(item);
    if(square != null)
    {
      //console.log(item, index, square);
    if (square['type'] == curentGame.KING){
      if (square['color'] == curentGame.WHITE) {
        TheWhiteKing=item;
      }else{
        BlackKing=item;
      }
    }
  }
  });
  return {'TheWhiteKing':TheWhiteKing, 'TheBlackKing':BlackKing}
}

/**
 * @param {string} square - FileRankFromSquare('c1') -> [3,1]
 */
export function FileRankFromSquare(square){
  return [square.charCodeAt(0)-96, parseInt(square[1])];
}

/**
 * @param {Number} Square1File -
 * @param {Number} Square1Rank -
 * @param {Number} Square2File -
 * @param {Number} Square2Rank -
 * 
 */
export function distanceBetweenTwoSquares(Square1File, Square1Rank, Square2File, Square2Rank){
  return Math.max(Math.abs(Square2Rank-Square1Rank), Math.abs(Square2File-Square1File));
}


/**
 * @param {Number} original_file -
 * @param {Number} original_rank -
 * @param {string[]} squares -
 * 
 */
export function distanceBetweenSquareAndSquares(square_file, square_rank, squares){
  var minValue =Number.MAX_VALUE;
  for(var i=0; i<squares.length; i++){
      var [file, rank] = FileRankFromSquare(squares[i]);
      minValue = Math.min(minValue, distanceBetweenTwoSquares(square_file, square_rank, file, rank));
  }
  return minValue;
}

/**
 * @param {string} move - Ke3 -> e3
 */
export function squareFromMove(move){
  if (move.length == 3){
    return move.slice(1);
  }
  return move;
}


/**
 * @param {string} move - Ke3
 * @param {string[]} squares - ['f7', 'g7', 'h7']
 * 
 */
export function distanceBetweenMoveAndSquares(move, squares){
  var square = squareFromMove(move);
  var [file, rank] = FileRankFromSquare(square);
  return distanceBetweenSquareAndSquares(file, rank, squares);
}