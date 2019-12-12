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