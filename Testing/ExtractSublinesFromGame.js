QUnit.test( 'combineTwoMovesLines("1. e4 ", " 1... e5 *")', function( assert ) {
  let moveLine = combineTwoMovesLines("1. e4 ", " 1... e5 *");
  assert.ok(moveLine  == "1. e4 e5 *", "Contains the same game");
});