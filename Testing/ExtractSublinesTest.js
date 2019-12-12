

let MovesOfSimpleGame = `1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 *`;


QUnit.test( "ExtractSublinesFromGame from SimpleGame", function( assert ) {
  let games = ExtractSublinesFromGame(SimpleGame);

  assert.ok( games.length == 1, "Length == 1" );
  assert.ok( games[0].trim() == MovesOfSimpleGame, "Contains the same game");
});

QUnit.test( "ExtractSublinesFromGame from Gamee4d4Variation", function( assert ) {
  let games = ExtractSublinesFromGame(Gamee4d4Variation);

  assert.ok( games.length == 2, "Length == 2" );
  assert.ok( games[0].trim() == "1. d4", "Variation");
  assert.ok( games[1].trim() == "1. e4   *", "MainLine");
});

QUnit.test( "ExtractSublinesFromGame from Gamee4d4Variatione6", function( assert ) {
  let games = ExtractSublinesFromGame(Gamee4d4Variatione6);

  assert.ok( games.length == 2, "Length == 2" );
  assert.ok( games[0].trim() == "1. d4", "Variation");
  assert.ok( games[1].trim() == "1. e4 1... e6 *", "MainLine");
  
});

QUnit.test( "ExtractSublinesFromGame from GameOfVariation", function( assert ) {
  let games = ExtractSublinesFromGame(GameOfVariation);

  assert.ok( games.length == 4, "Length == 4" );
  assert.ok( games[0].trim() == "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Bd3", "Variation1");
  assert.ok( games[1].trim() == "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. d4 exd4 5. Nxd4", "Variation2");
  assert.ok( games[2].trim() == "1. e4 e5 2. Nf3 Nc6 3. Bb5    3... a6 4. Ba4 Nf6 5. O-O Bc5 6. d3", "Variation3");
  assert.ok( games[3].trim() == "1. e4 e5 2. Nf3 Nc6 3. Bb5    3... a6 4. Ba4 Nf6 5. O-O Bc5 6. c3  *", "MainLine");
  
  
});
