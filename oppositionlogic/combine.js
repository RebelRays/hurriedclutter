
//import { boardRemoveGreySquares, boardGreySquare } from './uilogic/goalsquare.js'; // Or it could be simply `hello.js`
//import { minime } from './uilogic/goalsquare.js'; // Or it could be simply `hello.js`
import * as chess from '../AddOn/chess-0.10.2.js';
import * as boardinteraction from './uilogic/boardinteractions.js';
import * as squareLogic from './gamelogic/squarelogic.js';
import * as ai from './gamelogic/AI2.js';
import * as opposition from './gamelogic/opposition.js';


window.FileRankFromSquare = squareLogic.FileRankFromSquare;
window.distanceBetweenTwoSquares = squareLogic.distanceBetweenTwoSquares;
window.distanceBetweenSquareAndSquares = squareLogic.distanceBetweenSquareAndSquares;
window.minimizeDistanceToGoal = ai.minimizeDistanceToGoal;
window.maximizeDistanceToGoal = ai.maximizeDistanceToGoal;
window.getDirectVerticalOpposition = opposition.getDirectVerticalOpposition;
window.getDirectVertical_3_Opposition = opposition.getDirectVertical_3_Opposition;
window.getDirectVertical_5_Opposition = opposition.getDirectVertical_5_Opposition;



class GameState {
    constructor(uiChessBoardWrapper, chessBoard, goalSquares, uiChessBoardId) {
        this.uiChessBoardWrapper = uiChessBoardWrapper;
        this.chessBoard = chessBoard;
        this.goalSquares = goalSquares;
        this.uiChessBoardId = uiChessBoardId;
      }
}

window.genNewBoardGame = function genNewBoardGame(uiChessBoardId){
  console.log("This is running");
  //removeGreySquares();
  var curentGame = new Chess();
  curentGame.clear();
  window.curry = curentGame;
  var goalSquares = squareLogic.select_goal_squares();
  window.goaly = goalSquares;
  var [white_king_staring_square, black_king_staring_square] = squareLogic.select_king_squares();
  curentGame.put({ type: 'k', color: 'w' }, white_king_staring_square);
  curentGame.put({ type: 'k', color: 'b' }, black_king_staring_square);
  
  var state = new GameState(null, curentGame, goalSquares, uiChessBoardId)
  var uiChessBoardWrapper = new boardinteraction.UIBoardWrapper(state, MoveCallback);
  //uiChessBoardWrapper.createUIBoard(state);
  uiChessBoardWrapper.markGoalSquares(goalSquares);
  uiChessBoardWrapper.position(curentGame.fen());

  console.log('Done Generating');

};


/**
 * @param {GameState} gameState - somedescription
 */
function MoveCallback(gameState, movedToSquare){

  var goalSquares = gameState.goalSquares;
        if (goalSquares != null){
            for(var goalIndex=0; goalIndex<goalSquares.length;goalIndex++ ){
                if (movedToSquare == goalSquares[goalIndex]){
                    console.log('Yaaaaay done');
                    ///window.setTimeout(gameDone, 150);
                    NewGame(gameState);
                    return;
                }
            }
        }
  
  //console.log('gamestate callback = ' + gameState);
  var move = ai.getMove(gameState);
  if(move != null){
    gameState.chessBoard.move(move);

  }
  gameState.uiChessBoardWrapper.position(gameState.chessBoard.fen());
}


/**
 * @param {GameState} gameState - somedescription
 */
function NewGame(gameState){
  
  var curentGame = gameState.chessBoard;
  curentGame.clear();
  var goalSquares = squareLogic.select_goal_squares();
  var [white_king_staring_square, black_king_staring_square] = squareLogic.select_king_squares();
  curentGame.put({ type: 'k', color: 'w' }, white_king_staring_square);
  curentGame.put({ type: 'k', color: 'b' }, black_king_staring_square);
  
  gameState.goalSquares = goalSquares;
  var uiChessBoardWrapper = gameState.uiChessBoardWrapper;
  uiChessBoardWrapper.removeGreySquares();
  uiChessBoardWrapper.markGoalSquares(goalSquares);
  uiChessBoardWrapper.position(curentGame.fen());
}
