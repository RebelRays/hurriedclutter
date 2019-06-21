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

//0, 