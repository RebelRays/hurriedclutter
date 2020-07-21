
//import { boardRemoveGreySquares, boardGreySquare } from './uilogic/goalsquare.js'; // Or it could be simply `hello.js`
//import { minime } from './uilogic/goalsquare.js'; // Or it could be simply `hello.js`
import * as chess from '../AddOn/chess-0.10.2.js';
import * as boardinteraction from './uilogic/boardinteractions.js';
import * as db from './database/onepawn.js';



function getFen(){
  //randome
  var win = db.win[Math.floor(Math.random() * db.win.length)];
  var draw = db.draw[Math.floor(Math.random() * db.draw.length)];

  if(Math.floor(Math.random() * 2) == 0 )
    return ['win', win];
  else 
  return ['draw', draw];
}



class GameState {
    constructor(uiChessBoardWrapper, chessBoard, goalSquares, uiChessBoardId, correctAnswer) {
        this.uiChessBoardWrapper = uiChessBoardWrapper;
        this.chessBoard = chessBoard;
        this.goalSquares = goalSquares;
        this.uiChessBoardId = uiChessBoardId;
        this.correctAnswer = correctAnswer;
      }
}

window.gamestate = new GameState(null, null, null, null, 'None');


window.genNewBoardGame = function genNewBoardGame(uiChessBoardId){
  //console.log("This is running");
  //removeGreySquares();
  
  //curentGame.clear();
  
  gamestate.uiChessBoardId= uiChessBoardId;
  gamestate.chessBoard= new Chess();

  var state = gamestate;//new GameState(null, curentGame, null, uiChessBoardId, 'None');
  var uiChessBoardWrapper = new boardinteraction.UIBoardWrapper(state, MoveCallback);
  gamestate.uiChessBoardWrapper = uiChessBoardWrapper;
  //uiChessBoardWrapper.createUIBoard(state);
  uiChessBoardWrapper.position(gamestate.chessBoard.fen());

  NewGame(state);

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
  
  var [result, fen] = getFen();
  var curentGame = gameState.chessBoard;
  curentGame.load(fen);
  gameState.correctAnswer=result;
  var uiChessBoardWrapper = gameState.uiChessBoardWrapper;
  uiChessBoardWrapper.position(curentGame.fen());
}


window.winClick = function(gameState){
  if(gameState.correctAnswer == 'win'){
    NewGame(gamestate);
  }else{
    
    alert('Wrong!');
    console.log("Clicked win");
  }
  
}


window.drawClick = function(gameState){
  if(gameState.correctAnswer == 'draw'){
    NewGame(gamestate);
  }else{
    alert('Wrong!');
    console.log("Clicked draw");
  }
  
}


window.syzygyClick = function(gameState){
  //xhtg m86console.log('clicked');
  var URL = "https://syzygy-tables.info/?fen=" + gamestate.chessBoard.fen();
  //window.location.href = "https://syzygy-tables.info/?fen=" + gamestate.chessBoard.fen();
  window.open(URL, '_blank');

}