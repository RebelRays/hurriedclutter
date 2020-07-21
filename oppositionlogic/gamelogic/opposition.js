
import * as squareLogic2 from './squarelogic.js';
//King1 moved, does he have oppoistion?
//return 1 -> king1, 0 nobody, -1 -> king2
export function getDirectVerticalOpposition(king1File, king1Rank, king2File, king2Rank)
{
    var rankDiff = king1Rank-king2Rank;

    var distanceToOppositionSquare = 0;
    if(rankDiff==0){
        return 0;
    }
    else if(rankDiff<0){
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File, king1Rank+2, king2File, king2Rank);
    }else{
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File, king1Rank-2, king2File, king2Rank);
    }

    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    return 0;
}

export function getDirectVertical_3_Opposition(king1File, king1Rank, king2File, king2Rank)
{
    var rankDiff = king1Rank-king2Rank;

    var distanceToOppositionSquare = 0;
    if(rankDiff==0){
        return 0;
    }
    else if(rankDiff<0){
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File, king1Rank+4, king2File, king2Rank);
    }else{
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File, king1Rank-4, king2File, king2Rank);
    }

    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    return 0;
}

export function getDirectVertical_5_Opposition(king1File, king1Rank, king2File, king2Rank)
{
    var rankDiff = king1Rank-king2Rank;

    var distanceToOppositionSquare = 0;
    if(rankDiff==0){
        return 0;
    }
    else if(rankDiff<0){
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File, king1Rank+6, king2File, king2Rank);
    }else{
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File, king1Rank-6, king2File, king2Rank);
    }

    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    return 0;
}



export function getDirectHorizontalOpposition(king1File, king1Rank, king2File, king2Rank)
{
    var rankDiff = king1File-king2File;

    var distanceToOppositionSquare = 0;
    if(rankDiff==0){
        return 0;
    }
    else if(rankDiff<0){
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+2, king1Rank, king2File, king2Rank);
    }else{
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-2, king1Rank, king2File, king2Rank);
    }

    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    return 0;
}

export function getDirectHorizontal_3_Opposition(king1File, king1Rank, king2File, king2Rank)
{
    var rankDiff = king1File-king2File;

    var distanceToOppositionSquare = 0;
    if(rankDiff==0){
        return 0;
    }
    else if(rankDiff<0){
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+4, king1Rank, king2File, king2Rank);
    }else{
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-4, king1Rank, king2File, king2Rank);
    }

    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    return 0;
}

export function getHorizontal_5_Opposition(king1File, king1Rank, king2File, king2Rank)
{
    var rankDiff = king1File-king2File;

    var distanceToOppositionSquare = 0;
    if(rankDiff==0){
        return 0;
    }
    else if(rankDiff<0){
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+6, king1Rank, king2File, king2Rank);
    }else{
        distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-6, king1Rank, king2File, king2Rank);
    }

    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    return 0;
}

export function getDiagonal_Opposition(king1File, king1Rank, king2File, king2Rank)
{
    var distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+2, king1Rank+2, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+2, king1Rank-2, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-2, king1Rank-2, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-2, king1Rank+2, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }

    return 0;
}

export function getDiagonal_Opposition_3(king1File, king1Rank, king2File, king2Rank)
{
    var distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+4, king1Rank+4, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+4, king1Rank-4, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-4, king1Rank-4, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-4, king1Rank+4, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }

    return 0;
}

export function getDiagonal_Opposition_5(king1File, king1Rank, king2File, king2Rank)
{
    var distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+6, king1Rank+6, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File+6, king1Rank-6, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-6, king1Rank-6, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }
    distanceToOppositionSquare=squareLogic2.distanceBetweenTwoSquares(king1File-6, king1Rank+6, king2File, king2Rank);
    if(distanceToOppositionSquare == 0){
        return 1;
    }else if(distanceToOppositionSquare == 1){
        return -1; //Opponent can take opposition
    }

    return 0;
}


export function usefulVerticalOpposition(wKFile, wKRank, bKFile, bKRank, goalSquares, sideToMove){
    var RankDiff = bKRank-wKRank;
    var FileDiff = bKFile-wKFile;

    var oneOfThegoalSquares=goalSquares[0];

    var [gFile, gRank] =  squareLogic2.FileRankFromSquare(oneOfThegoalSquares);

    if(RankDiff >0){ //Normal case
        
        var closeOppositionFile = bKFile;
        var closeOppositionRank = bKRank-2;
        var distancetoopposition = squareLogic2.distanceBetweenTwoSquares(wKFile, wKRank, closeOppositionFile, closeOppositionRank);

    }
}

