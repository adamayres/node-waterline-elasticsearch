/**
 * -
 *
 * -
 *
 * @author ivanmccarthy
 * @date 8/12/13
 */

// Dependencies
var express   = require( 'express' );
var waterline = require( 'waterline' );
var adapter   = require( '../' );

// Create App
var app = express();

// Setup App
app.use(express.bodyParser());
app.use(express.methodOverride());

// Namespaced Models Object
app.models = {};



// Routes

app.post( '/users', function( req, res ) {
  app.models.user.create( req.body, function( error, model ) {
    if ( error ) return res.json( { error: error } );
    res.json( model );
  });
});

app.get( '/users/:id', function( req, res ) {

  app.models.user.find( req.params.id, function( error, model ) {

    console.log( model );

    if ( error ) return res.json( { error: error } );
    res.json( model[0] );
  });
});

app.put( '/users', function( req, res ) {

});

app.delete( '/users', function( req, res ) {
  app.models.user.destroy( req.body, function( error ) {
    if ( error ) return res.json( { error: error });
    res.json( { status: 'ok' } );
  });
});







// Build Model
var User = waterline.Collection.extend({
  adapter: 'waterline-elasticsearch',
  tableName: 'users',
  schema: true,
  identity: 'users',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    type: 'string',
    body: 'array'
  }
});

new User({ adapters: { 'waterline-elasticsearch': new adapter() }}, function( error, collection ) {
  if ( error ) {
    console.log( error );
    return
  }

  app.models.user = collection;

  app.listen( 3000 );
  console.log( 'Listening on port 3000' );
});
