

QUnit.test( "SimpleGame Split", function( assert ) {
  let games = SplitIntoGames(SimpleGame);

  assert.ok( games.length == 1, "Length == 1" );
  assert.ok( games[0].trim() == SimpleGame, "Contains the same game");
});

QUnit.test( "TwoSimpleGames Split", function( assert ) {
  let games = SplitIntoGames(TwoSimpleGames);

  assert.ok( games.length == 2, "Should be 2 games" );
  assert.ok( games[0].trim() === SimpleGame, "game1");
  assert.ok( games[1].trim() === SimpleGame2, "game2");
});

QUnit.test( "ThreeSimpleGames Split", function( assert ) {
  let games = SplitIntoGames(ThreeSimpleGames);

  assert.ok( games.length == 3, "Should be 3 games" );
  assert.ok( games[0].trim() === SimpleGame, "game1");
  assert.ok( games[1].trim() === SimpleGame2, "game2");
  assert.ok( games[2].trim() === SimpleGame3, "game3");
});