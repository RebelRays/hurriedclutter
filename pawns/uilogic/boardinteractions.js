
import * as chessUI from '../../AddOn/chessboardjs-1.0.0/js/chessboard-1.0.0.js';

var whiteSquareGrey = '#a9a9a9';
var blackSquareGrey = '#696969';


export class UIBoardWrapper{
    constructor(GameState, MoveCallback){
        
        GameState.uiChessBoardWrapper = this;
        this.GameState=GameState;
        this.UIChessBoard = this.createUIBoard(GameState.uiChessBoardId, MoveCallback);

        //this.OpponentsMove;

    }



    createUIBoard(boardId, MoveCallback){
        var theGameState = this.GameState;
        var dropy = this.onDrop;
        var moveDone = this.MoveDone;

        var UIChessBoard = Chessboard(boardId, {
            draggable: true,
            moveSpeed: 50,
            snapbackSpeed: 50,
            snapSpeed: 50,
            position: 'start',
            onDrop:  function(source, target, piece, newPos, oldPos, orientation){
                return dropy(source, target, piece, newPos, oldPos, orientation, theGameState, moveDone, MoveCallback);
            }
          });
          UIChessBoard.start();
          return UIChessBoard;
    }

    onDrop (source, target, piece, newPos, oldPos, orientation, GameState, moveDone, MoveCallback) {
        $('#HelpMovesSpan').text("");
        //console.log('Source: ' + source)
        //console.log('Target: ' + target)
        //console.log('Piece: ' + piece)
        //console.log('New position: ' + Chessboard.objToFen(newPos))
        //console.log('Old position: ' + Chessboard.objToFen(oldPos))
        //console.log('Orientation: ' + orientation)
        //console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    
        // see if the move is legal
        var curentGame = GameState.chessBoard;

        var move = curentGame.move({
          from: source,
          to: target,
          promotion: 'q' // NOTE: always promote to a queen for example simplicity
        })
    
        // illegal move
        if (move === null) return 'snapback';
    
        

        if (curentGame.turn() == 'b'){
            window.setTimeout(function(){
                MoveCallback(GameState, target);
            }, 150);
        }
      }


    markGoalSquares(goalSquares){
        if (goalSquares != null){
            for(var goalIndex=0; goalIndex<goalSquares.length;goalIndex++ ){
                this.greySquare(goalSquares[goalIndex]);
                }
        }
    }
    greySquare (square) {
        var $square = $('#' + this.GameState.uiChessBoardId+' .square-' + square);
        var background = whiteSquareGrey;
        if ($square.hasClass('black-3c85d')) {
            background = blackSquareGrey;
        }
        $square.css('background', background);
    }
    removeGreySquares(){
        $('#'+ this.GameState.uiChessBoardId+ ' .square-55d63').css('background', '');
    }
    
    position(fen){
        this.UIChessBoard.position(fen);
    }



}
