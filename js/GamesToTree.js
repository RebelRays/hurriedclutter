function getMoveTree(gms){
    let moveTree = {};
    for(let gmNo = 0; gmNo<gms.length; gmNo++){
        let currentGame = gms[gmNo];
        let chess = new Chess();
        chess.load_pgn(currentGame);
        let movehistory = chess.history({ verbose: true });
        let currentMoveTreeNode = moveTree;
        for(let moveNo=0; moveNo<movehistory.length; moveNo++){
            let curMove = movehistory[moveNo];
            let moveString = curMove.from + curMove.to;
            if(moveString in currentMoveTreeNode){
                currentMoveTreeNode[moveString]["Weight"] =  currentMoveTreeNode[moveString]["Weight"] + movehistory.length-moveNo;
                currentMoveTreeNode[moveString]["Lines"] = currentMoveTreeNode[moveString]["Lines"] + 1;
                currentMoveTreeNode=currentMoveTreeNode[moveString]; //move down the tree
            }else {
                currentMoveTreeNode[moveString]={};
                currentMoveTreeNode[moveString]["Weight"]=movehistory.length-moveNo;
                currentMoveTreeNode[moveString]["Lines"]=1;
                currentMoveTreeNode[moveString]["PlayThrough"]=0;
                currentMoveTreeNode[moveString]["RandomOffset"]=Math.floor(Math.random() * 3);;
                currentMoveTreeNode=currentMoveTreeNode[moveString];
            }
        }
    }
    return moveTree;
}
//0, 