function SplitIntoGames(ManyGamesString){
    let restOfGamesString = ManyGamesString;
    let LastIndex = 0;
    var arr = [];
    while (true){
        let NextIndex = ManyGamesString.indexOf("[Event ", LastIndex+1);//0 280 etc
        if(NextIndex == -1){
            let lastGame = ManyGamesString.slice(LastIndex, ManyGamesString.length);
            arr.push(lastGame);
            break;
        }
        let lastGame = ManyGamesString.slice(LastIndex, NextIndex);
        arr.push(lastGame);
        LastIndex=NextIndex;
    }
    return arr;
}

function ExtractSublines(Games){
    var arr = [];
    for(var i=0; i<Games.length; i++){
        var currentGame = Games[i];
        var ExtractedGames = ExtractSublinesFromGame(currentGame);
        arr= arr.concat(ExtractedGames);
    }
    return arr;
}

function SplitHeadFromMoves(OneGame){
    let lines = OneGame.split("\n"); 
    let Head = "";
    let Moves = "";
    
    let DoneWithHead = false;

    for(let i=0;i<lines.length;i++){
        var curLine = lines[i];
        if(curLine.startsWith("1. ")){
            DoneWithHead=true;
        }
        if(DoneWithHead){
            Moves=Moves + "\n" + curLine;
        }else{
            Head=Head + "\n" + curLine;
        }

    }
    return {Head: Head, Moves: Moves};

}

function FilterComments(Moves){
    let newLine = "";
    let braketOpen = false;
    for(let i=0;i<Moves.length;i++){
        let curChar = Moves.charAt(i);
        if(curChar === '{'){
            braketOpen=true;
        }
        if(curChar === '}'){
            braketOpen=false;
        }
        if(!braketOpen){
            newLine += curChar;
        }
    }
    return newLine;
}

function ExtractSublinesFromGame(OneGame){
    
    let {Head, Moves} = SplitHeadFromMoves(OneGame);
    let MovesWithoutComments = FilterComments(Moves);
    let currentMovelines = MovesWithoutComments;

    let currentPointer = 0;
    let lastBraketPosition = -1;
    let lastDotPosition = -1;
    let lastDotBeforeParenthesesPosition = -1;
    var AllMoves = [];
    let lookingForFirstDotAfterParentheses = false;
    let lookingForFirstDotAfterParenthesesPosition = -1;
    while (true){
        if(currentPointer >= currentMovelines.length){
            AllMoves.push(currentMovelines);
            break;
        }

        let curChar = currentMovelines.charAt(currentPointer);
        if(curChar== '('){
            lastBraketPosition=currentPointer;
            lastDotBeforeParenthesesPosition=lastDotPosition;
            lookingForFirstDotAfterParentheses=true;
        }else if (curChar == ')'){
            //remove from currline, goto () position
            let copiedChars = currentMovelines.slice(lookingForFirstDotAfterParenthesesPosition, currentPointer);
            let newLine = currentMovelines.slice(0, lastDotBeforeParenthesesPosition) + copiedChars;
            AllMoves.push(newLine);
            currentMovelines = currentMovelines.slice(0, lastBraketPosition) + currentMovelines.slice(currentPointer+1, currentMovelines.length);
            //Reset parameters?
            currentPointer=-1;//lastBraketPosition;
            lastBraketPosition=-1;
            lastDotPosition=-1;
            lastDotBeforeParenthesesPosition=-1;
            lookingForFirstDotAfterParentheses=false;
            lookingForFirstDotAfterParenthesesPosition=-1;

        }else if(curChar == '.'){
            lastDotPosition=currentPointer;
            if(lookingForFirstDotAfterParentheses){
                lookingForFirstDotAfterParenthesesPosition=currentPointer;
                lookingForFirstDotAfterParentheses=false;
            }
        }
        currentPointer++;


    }
    return AllMoves;
}

/*
function ExtractSublinesFromGame(OneGame){
    //Save header
    //Count {} & ()
    //How to x it
    let {Head, Moves} = SplitHeadFromMoves(OneGame);
    let MovesWithoutComments = FilterComments(Moves);

    let currentPointer = 0;
    let currentMovelines = MovesWithoutComments;
    let firstBraketPosition = -1;
    let lastBraketPosition = -1;
    
    //Do we need headers? -> I think no
    var AllMoves = [];
    while (true){
        if(currentPointer >= currentMovelines.length){
            AllMoves.push(currentMovelines);
            break;
        }
        if(currentMovelines.charAt(currentPointer) == '('){
            if(firstBraketPosition == false){
                firstBraketPosition=currentPointer;
            }
            lastBraketPosition=currentPointer;
        }

        let moveVersion = currentMovelines;
        if(moveVersion.charAt(currentPointer) == ')'){
            //Go other direction
            let LastDot = -1;
            let PassedBrakets = false;
            for(let negI=currentPointer-1; negI>0; negI--){
                let negIChar = currentMovelines.charAt(negI);
                if((negIChar === '.') && PassedBrakets){
                    currentMovelines=Remove(currentMovelines, negI, LastDot);
                    LastDot=negI;
                    currentPointer=negIChar;
                    PassedBrakets=false;

                }else if(negIChar === '.'){
                    LastDot=negI;
                } else if(negIChar === '('){
                    PassedBrakets=true;
                }
            }
        }
       
    }
    return AllMoves;
}
*/
//0, 