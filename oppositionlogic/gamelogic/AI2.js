import * as squareLogic2 from './squarelogic.js';
import * as chess from '../../AddOn/chess-0.10.2.js';

import * as opposition from './opposition.js';



export function makeRandomeMove(curentGame){
    var possibleMoves = curentGame.moves();
    // game over
    if (possibleMoves.length === 0) return;

    var randomIdx = Math.floor(Math.random() * possibleMoves.length);
    return possibleMoves[randomIdx];
}


//BlackMoves

export function maximizeDistanceToGoal(curentGame, TheWhiteKing, goalSquares, filterDistancesLowerThanThis, HighestValueMinimizerAccepts, depth){
    var possibleMoves = curentGame.moves();
    if (possibleMoves.length === 0){
        console.log("Black can never run out of moves");
        return;
    } 

    //Explore the most promising route first
    var moveDistance = []
    for(var moveNo=0; moveNo<possibleMoves.length; moveNo++){
        var move = possibleMoves[moveNo];
        var distanceToOpponentKing = squareLogic2.distanceBetweenMoveAndSquares(move, [TheWhiteKing]);
        moveDistance.push({'move': move, 'distance':distanceToOpponentKing});
    }
    moveDistance.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

    var leftGoalSquares=goalSquares[0];
    var rightMostGoalSquare=goalSquares[2];
    
    var [gLeftFile, gLeftRank] =  squareLogic2.FileRankFromSquare(leftGoalSquares);
    var [gRightFile, gRightRank] =  squareLogic2.FileRankFromSquare(rightMostGoalSquare);
    var gRank = gLeftRank;

    var [wKFile, wKRank] = squareLogic2.FileRankFromSquare(TheWhiteKing);

    //explore
    //Filter LowestOrNot -> no min filters on it, just pass it along
    var limit = filterDistancesLowerThanThis;
    var lowestMove = null;
    for(var moveNoIndex=0; moveNoIndex<moveDistance.length; moveNoIndex++){
        var promisingMove = moveDistance[moveNoIndex].move;
        var promisingMoveEval = null;
        var NewBlackKingPosition = squareLogic2.squareFromMove(promisingMove);
        
        //QuickEvalIfWinningLosing
        var [bKFile, bKRank] = squareLogic2.FileRankFromSquare(NewBlackKingPosition);

        var RankDiff = bKRank-wKRank;


        if(bKRank > wKRank){
            if(gRank >= (wKRank+1)){
                if(opposition.getDirectVerticalOpposition(bKFile, bKRank, wKFile, wKRank) == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gRank >= (wKRank+2))){
                if(opposition.getDirectVertical_3_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gRank >= (wKRank+3))){
                if(opposition.getDirectVertical_5_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
        }else if(bKRank < wKRank){
            if(gRank <= (wKRank-1)){
                if(opposition.getDirectVerticalOpposition(bKFile, bKRank, wKFile, wKRank) == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gRank <= (wKRank-2))){
                if(opposition.getDirectVertical_3_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gRank <= (wKRank-3))){
                if(opposition.getDirectVertical_5_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
        }

        if(bKFile > wKFile){
            if ((promisingMoveEval==null) && (gLeftFile >= (wKFile+1))){
                if(opposition.getDirectHorizontalOpposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gLeftFile >= (wKFile+2))){
                if(opposition.getDirectHorizontal_3_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gLeftFile >= (wKFile+3))){
                if(opposition.getHorizontal_5_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
        }else if(bKFile < wKFile){
            if ((promisingMoveEval==null) && (gRightFile <= (wKFile-1))){
                if(opposition.getDirectHorizontalOpposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gRightFile <= (wKFile-2))){
                if(opposition.getDirectHorizontal_3_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
            if ((promisingMoveEval==null) && (gRightFile <= (wKFile-3))){
                if(opposition.getHorizontal_5_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                    promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                }
            }
        }
        if((promisingMoveEval==null)){
            if((gLeftFile > wKFile) && (gRank > wKRank)){
                if((bKRank > wKRank) && (bKFile > wKFile)){
                    if(opposition.getDiagonal_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                        promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                    }
                }
            }else if ((gRightFile < wKFile) && (gRank > wKRank)){
                if((bKRank > wKRank) && (bKFile < wKFile)){
                    if(opposition.getDiagonal_Opposition(bKFile, bKRank, wKFile, wKRank)  == 1){
                        promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                    }
                }
            }
        }

        if((promisingMoveEval==null)){
            if((gLeftFile+1 > wKFile) && (gRank+1 > wKRank)){
                if((bKRank > wKRank) && (bKFile > wKFile)){
                    if(opposition.getDiagonal_Opposition_3(bKFile, bKRank, wKFile, wKRank)  == 1){
                        promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                    }
                }
            }else if ((gRightFile-1 < wKFile) && (gRank-1 > wKRank)){
                if((bKRank > wKRank) && (bKFile < wKFile)){
                    if(opposition.getDiagonal_Opposition_3(bKFile, bKRank, wKFile, wKRank)  == 1){
                        promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                    }
                }
            }
        }
        if((promisingMoveEval==null)){
            if((gLeftFile+2 > wKFile) && (gRank+2 > wKRank)){
                if((bKRank > wKRank) && (bKFile > wKFile)){
                    if(opposition.getDiagonal_Opposition_5(bKFile, bKRank, wKFile, wKRank)  == 1){
                        promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                    }
                }
            }else if ((gRightFile-2 < wKFile) && (gRank-2 > wKRank)){
                if((bKRank > wKRank) && (bKFile < wKFile)){
                    if(opposition.getDiagonal_Opposition_5(bKFile, bKRank, wKFile, wKRank)  == 1){
                        promisingMoveEval= {'move':'assumedVictoryForBlack', 'distance': moveDistance[moveNoIndex].distance * 10.0};
                    }
                }
            }
        }

        

        if (promisingMoveEval == null){
            
            var nextBoard = new Chess(curentGame.fen());
            nextBoard.move(promisingMove);
            promisingMoveEval = minimizeDistanceToGoal(nextBoard, NewBlackKingPosition, goalSquares, limit, HighestValueMinimizerAccepts, depth-1);
        } else{
            limit = promisingMoveEval.distance;
            lowestMove=promisingMove;
            break;
        } 
        

        if (promisingMoveEval.move != null)
        {
            var distance = promisingMoveEval.distance;
            if(distance >= HighestValueMinimizerAccepts){ //This branch is going to be ignored 
                return {'move':promisingMove, 'distance': distance};
            }
            if(distance > limit){
                limit=distance;
                lowestMove=promisingMove;
            }
        }
        
    }
    return {'move':lowestMove, 'distance': limit};
}

//white
export function minimizeDistanceToGoal(curentGame, TheBlackKing, goalSquares, LowestValueTheMaximizerAccepts, HighestValueEncounteredPathFromRoot, depth){
    var possibleMoves = curentGame.moves();
    if (possibleMoves.length === 0){
        console.log("White can never run out of moves");
        return;
    }

    var moveDistance = []
    for(var moveNo=0; moveNo<possibleMoves.length; moveNo++){
        var move = possibleMoves[moveNo];
        var distanceToGoal = squareLogic2.distanceBetweenMoveAndSquares(move, goalSquares);
        moveDistance.push({'move': move, 'distance':distanceToGoal});
    }
    moveDistance.sort((a, b) => (a.distance > b.distance) ? 1 : -1); //opposite

    var mostPromisingMove=moveDistance[0];
    if ((depth <= 0) || mostPromisingMove.distance==0 ){
        return {'move': mostPromisingMove.move, 'distance':mostPromisingMove.distance};
    }

    var oneOfThegoalSquares = goalSquares[0];
    var [gFile, gRank] =  squareLogic2.FileRankFromSquare(oneOfThegoalSquares);
    var [bKFile, bKRank] = squareLogic2.FileRankFromSquare(TheBlackKing);

    var localLowestDistance = HighestValueEncounteredPathFromRoot; //Any higher and uproot minimizers will prune
    var lowestMove = null;
    for(var moveNoIndex=0; moveNoIndex<moveDistance.length; moveNoIndex++){
        var promisingMove = moveDistance[moveNoIndex].move;
        var promisingMoveEval = null;

        var NewWhiteKingPosition = squareLogic2.squareFromMove(promisingMove);
        var [wKFile, wKRank] = squareLogic2.FileRankFromSquare(NewWhiteKingPosition);

        /*
        if(gRank > wKRank){
            //Location Of Opposition
            var closeOppositionFile = wKFile;
            var closeOppositionRank = wKRank+2;
            var distancetoopposition = squareLogic2.distanceBetweenTwoSquares(bKFile, bKRank, closeOppositionFile, closeOppositionRank);
            //check above 8 rank?
            if(distancetoopposition == 0){
                //we have opposition -> head to goal
                promisingMoveEval= {'move':'assumedVictory', 'distance': moveDistance[moveNoIndex].distance / 10.0};

            }else if(distancetoopposition == 1){
                //opponent have close opposition
                
                promisingMoveEval= {'move':'assumedDefeat', 'distance': moveDistance[moveNoIndex].distance * 10.0};
            }
        }
        */
        if (promisingMoveEval == null){
            var nextBoard = new Chess(curentGame.fen());
            nextBoard.move(promisingMove);
            promisingMoveEval = 1+ maximizeDistanceToGoal(nextBoard, NewWhiteKingPosition, goalSquares, LowestValueTheMaximizerAccepts, localLowestDistance, depth);
        }
        if (promisingMoveEval.move != null)
        {
            var distance = promisingMoveEval.distance;
            if(distance <= LowestValueTheMaximizerAccepts){ //Then the previouse maximize function will filter out the return;
                return {'move':promisingMove, 'distance': distance};
            }
            
            if(distance < localLowestDistance){
                localLowestDistance=distance;
                lowestMove=promisingMove;
            }
        }
    }
    return {'move':lowestMove, 'distance': localLowestDistance};

}


export function getMove(gameState){

    var curentGame = gameState.chessBoard;
    var kingPositions = squareLogic2.getKingLocation(curentGame); 
    var TheWhiteKing = kingPositions['TheWhiteKing'];
    var bestMove = maximizeDistanceToGoal(curentGame, TheWhiteKing, gameState.goalSquares,-Number.MAX_VALUE,Number.MAX_VALUE,1);

    if(bestMove.distance >= 10){
        console.log("Move determined by opposition");
    }else{
        console.log("What is this?");
    }
    return bestMove.move;// makeRandomeMove(curentGame);


    /*
    var possibleMoves = curentGame.moves();
    // game over
    if (possibleMoves.length === 0) return;

    var kingPositions = squareLogic.getKingLocation(curentGame);
    var TheWhiteKing = kingPositions['TheWhiteKing'];
    var TheBlackKing = kingPositions['TheBlackKing'];

    var TheWhiteKingRank = parseInt(TheWhiteKing[1]);
    var TheBlackKingRank = parseInt(TheBlackKing[1]);

    var TheWhiteKingFile = TheWhiteKing.charCodeAt(0)-96;
    var TheBlackKingFile = TheBlackKing.charCodeAt(0)-96;

    for(var moveNo=0; moveNo<possibleMoves.length; moveNo++){
        var move = possibleMoves[moveNo];

        var [file, rank] = FileRankFromSquare(move);


        
        if(moveFile == TheWhiteKingFile) &&(){
            return move;
        }
    }
    var randomIdx = Math.floor(Math.random() * possibleMoves.length);
    return possibleMoves[randomIdx];
    */
}