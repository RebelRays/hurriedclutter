

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "hello test2", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "hello fail2", function( assert ) {
  assert.ok( 2 == "1", "Passed!" );
});

