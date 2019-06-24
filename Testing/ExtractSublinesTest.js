

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
  assert.ok( games[1].trim() == "1. e4   1... e6 *", "MainLine");
  
});
