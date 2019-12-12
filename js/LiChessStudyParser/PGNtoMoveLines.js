
function FilterComments(Moves){
    let newLine = "";
    let braketOpen = false;
    for(let i=0;i<Moves.length;i++){
        let curChar = Moves.charAt(i);
        if(curChar === '{'){
            braketOpen=true;
        }
        if(!braketOpen){
            newLine += curChar;
        }
        if(curChar === '}'){
            braketOpen=false;
        }
    }
    return newLine;
}

function GamePGNtoMoveLines(OneGame)
{
    let {Head, Moves} = SplitHeadFromMoves(OneGame);
    let MovesWithoutComments = FilterComments(Moves);
    MovesWithoutComments=MovesWithoutComments.replace('  ',' ');
    MovesWithoutComments=MovesWithoutComments.replace('\n','');
    MovesWithoutComments=MovesWithoutComments.replace('\r','');
    MovesWithoutComments=MovesWithoutComments.replace(' 1.','1.');
    return ExtractSublinesFromGame(MovesWithoutComments);
}


function PGNtoMoveLines(Games){
    var arr = [];
    for(var i=0; i<Games.length; i++){
        var currentGame = Games[i];
        var ExtractedGames = GamePGNtoMoveLines(currentGame);
        arr= arr.concat(ExtractedGames);
    }
    return arr;
}