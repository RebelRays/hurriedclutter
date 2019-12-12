
//
function combineTwoMovesLines(line1, line2){
    
    var startLine2 = -1;
    
    var line2FirstMove = "";
    var afterLine2FirstMove="";
    for(var i=0; i<line2.length; i++){

        if(line2[i] != ' '){
            if(startLine2==-1){
                startLine2=i;
                if(line2[i] == '('){
                    line2FirstMove=line2.slice(startLine2,i);
                    afterLine2FirstMove=line2.slice(i+1);
                    break;
                    //return line1 + line2.slice(i);
                }
            }
        }else{ //if(line2[i]!=' '){
            if(startLine2>-1){
                line2FirstMove=line2.slice(startLine2,i);
                afterLine2FirstMove=line2.slice(i+1);
                break;
            }
        }

    }
    var line2HasMoves = startLine2>-1;
    var line1HasMoves=false;
    for(var startLine1=0; startLine1<line1.length; startLine1++){
        if(line1[startLine1]!=''){
            line1HasMoves=true;
            break;
        }
    }
    if(line1HasMoves && line2HasMoves){
        if(line1.slice(-1) !=' '){
            line1 = line1 + ' ';
        }
    }

    if(line1HasMoves && line2FirstMove.endsWith("...")){
        return line1 + afterLine2FirstMove;
    }
    if(line2HasMoves){
        return line1+line2.slice(startLine2);
    }
    return line1;
}