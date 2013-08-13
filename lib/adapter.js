/**
 * Waterline ElasticSearch Adapter
 *
 * @param settings
 * @param fn
 * @returns {*}
 * @constructor
 */
function Adapter( settings, fn ) {

  // Configure dynamic settings.
  Object.defineProperties( this, {
    identity: {
      value: require( '../package' ).name,
      enumerable: true
    },
    syncable: {
      value: true,
      enumerable: true
    },
    defaults: {
      value: {
        host: 'localhost',
        port: 9200,
        auth: null
      },
      enumerable: true,
      writable: true
    },
    connection: {
      value: undefined,
      enumerable: true
    }
  });

  // @chainable
  return this;
}

/**
 * Adapter Instance methods.
 *
 */
Object.defineProperties( Adapter.prototype, {
  registerCollection: {
    /**
     *
     * @param collection
     * @param cb
     * @returns {*}
     */
    value: function registerCollection( collection, cb ) {
      Adapter.debug( 'registerCollection()' );

      if( 'undefined' === typeof this.connection ) {
        return Adapter.createConnection.call( this, collection.config || {}, cb );
      }

      cb();

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  teardown: {
    value: function teardown( cb ) {
      Adapter.debug( 'teardown()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  describe: {
    value: function describe( collectionName, cb ) {
      Adapter.debug( 'describe( %s )', collectionName );

      this.connection.getMapping( '_all', function( error, data ) {
        cb( null, data.properties )
      });

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  define: {
    /**
     * Model Defined.
     *
     *
     * @param collectionName {String} Name taken from tableName, it seems.
     * @param definition {Object} Schema.
     * @param cb
     * @returns {*}
     */
    value: function define( collectionName, definition, cb ) {
      Adapter.debug( 'define( %s )', collectionName, definition );

      cb( null, {} );

      // @chainable
      return this;


    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  drop: {
    value: function drop( collectionName, cb ) {
      Adapter.debug( 'drop()' );
      // @chainable
      return this;


    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  native: {
    value: function native( collection, cb ) {
      Adapter.debug( 'native()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },




  create: {
    value: function create( collectionName, data, cb ) {
      Adapter.debug( 'create()' );

      console.log( data );

      var index   = collectionName;
      var type    = data.type;
      var body    = data.body[0];
      var options = data.body.length === 2 ? body[1] : null;

      this.connection.index( index, type, data, options, function( error, response ) {
        if ( error ) cb( error, null );
        cb( null, response );
      });

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },




  createEach: {
    value: function createEach( collectionName, data, cb ) {
      Adapter.debug( 'createEach()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },




  find: {
    value: function find( collectionName, options, cb ) {
      Adapter.debug( 'find()' );

      var opts  = options.where;
      var value = [];

      var index   = collectionName;
      var id      = opts.id;

      this.connection.get( index, id, function( error, response ) {
      if ( error ) cb( error, null );
      value.push( response );
      cb( null, value );
      });

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },




  update: {
    value: function update( collectionName, options, values, cb ) {
      Adapter.debug( 'update()' );

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },






  destroy: {
    value: function destroy( collectionName, options, cb ) {
      Adapter.debug( 'destroy()' );

      var opts    = options.where;

      var index   = collectionName;
      var type    = opts.type;
      var id      = opts.id;
      var options = opts.options ? opts.options : null;

      this.connection.delete( index, type, id, options, function ( error, response ) {
        if ( error ) cb( error, null );

        console.log( response );

        cb( null, response );
      });

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },




  stream: {
    /**
     *
     * @param collectionName
     * @param options
     * @param stream
     */
    value: function stream( collectionName, options, stream ) {
      Adapter.debug( 'stream()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  query: {
    /**
     *
     * @param collectionName
     * @param query
     * @param data
     * @param cb
     */
    value: function query( collectionName, query, data, cb ) {
      Adapter.debug( 'query()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  addAttribute: {
    value: function addAttribute( collectionName, attrName, attrDef, cb ) {
      Adapter.debug( 'addAttribute()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  removeAttribute: {
    value: function removeAttribute( collectionName, attrName, cb ) {
      Adapter.debug( 'removeAttribute()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});

/**
 * Adapter Constructor methods.
 */
Object.defineProperties( module.exports = Adapter, {
  defaults: {
    value: {
      host: 'localhost',
      database: 'sails',
      port: 27017,
      user: null,
      password: null,
      schema: false,
      nativeParser: false,
      safe: true,
      url: null
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  create: {
    /**
     * Instantiation helper.
     *
     * @param settings
     * @returns {Adapter}
     */
    value: function create( settings, fn ) {
      return new Adapter( settings, fn );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  createConnection: {
    /**
     * Connect to ElasticSearch
     *
     * @private
     * @param config
     * @param cb
     */
    value: function createConnection( config, cb ) {
      Adapter.debug( 'registerCollection()' );

      var elastical = require( 'elastical' )

      this.connection = new ( require( 'elastical' ) ).Client( config.url, {
        port: config.port || 9200,
        auth: config.auth || null
      });

      this.connection.getMapping( '_all', function( error, data ) {
        cb( null, data.properties )
      });

      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  debug: {
    value: require( 'debug' )( 'waterline:elasticsearch' ),
    enumerable: true,
    configurable: true,
    writable: true
  },
  utility: {
    value: require( './utility' ),
    enumerable: true,
    configurable: true,
    writable: true
  }
});
