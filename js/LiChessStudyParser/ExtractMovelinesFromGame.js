function SectionAfterFirstMoveAnotation(str){
    var newStr = "";
    //Non space, followed by space
    var hasEncounteredNonSpace=false;
    for(var i=0;i<str.length;i++){
        if(str[i] != ' '){
            hasEncounteredNonSpace=true;
        }else if(hasEncounteredNonSpace){
            return str.slice(i);
        }
    }
    return newStr;
}

function ExtractSublinesFromGame(currentMoveline){
    var AllMoves = [];
    var OpenBraketCount = 0;
    var firstOpenBraketPosition = 0;
    var currentPointer = 0;

    var OneSpaceBack=0;
    var TwoSpacesBack=0;
    var TwoSpacesBeforeFirstBraket=0;
    var replacedPosition=0;
    while (true){
        if(currentPointer >= currentMoveline.length){
            AllMoves.push(currentMoveline);
            break;
        }

        var curChar = currentMoveline.charAt(currentPointer);
        if(curChar== ' '){
            TwoSpacesBack=OneSpaceBack;
            OneSpaceBack=currentPointer;
        }
        else if(curChar== '('){
            OpenBraketCount++;
            if(OpenBraketCount==1){
                firstOpenBraketPosition=currentPointer;
                replacedPosition=TwoSpacesBack;
                TwoSpacesBeforeFirstBraket=TwoSpacesBack;
            }
        }else if(curChar== ')'){
            OpenBraketCount--;
            if(OpenBraketCount==0){
                var BeforeFirstBracketString = currentMoveline.slice(0, firstOpenBraketPosition-1);
                var AfterNowString= currentMoveline.slice(currentPointer+1);
                var BracketString = currentMoveline.slice(firstOpenBraketPosition+1, currentPointer);
                var lines = ExtractSublinesFromGame(BracketString);
                var TwoSpacesBeforeReplacementString= currentMoveline.slice(0,TwoSpacesBeforeFirstBraket+1);
                for(var lineNo = 0; lineNo<lines.length; lineNo++){
                    //Maybe concatinate function to help with 2. d4 2... d5
                    var secondPart = SectionAfterFirstMoveAnotation(lines[lineNo]);
                    var newMoveLine = combineTwoMovesLines(TwoSpacesBeforeReplacementString, secondPart);
                    AllMoves.push(newMoveLine);
                }  
                currentMoveline=combineTwoMovesLines(BeforeFirstBracketString, AfterNowString);
                currentPointer=-1;//firstOpenBraketPosition;

                 OpenBraketCount = 0;
     firstOpenBraketPosition = 0;

     OneSpaceBack=0;
     TwoSpacesBack=0;
     TwoSpacesBeforeFirstBraket=0;
     replacedPosition=0;
            }
        }
        currentPointer++;
    }
    return AllMoves;
}