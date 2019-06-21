function getGames(FileNames, CallBack){
    let TotPGNFile = "";
    let currNoOfGames = 0;

    for(var i=0; i<FileNames.length; i++){
        var currentFilename = FileNames[i];
        var jqxhr = $.get( currentFilename, function() {})
          .done(function(data) {
            console.log("Done with " +currentFilename );
            PGNgames = data;
            TotPGNFile += PGNgames + "\n";
            currNoOfGames++;
            if(currNoOfGames == FileNames.length){
                CallBack(TotPGNFile);
            }
          })
          .fail(function() {
            alert( "error" );
            currNoOfGames++;
            if(currNoOfGames == FileNames.length){
                CallBack(TotPGNFile);
            }
          });
    }

}