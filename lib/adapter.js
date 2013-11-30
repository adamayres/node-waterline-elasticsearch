/**
 * Waterline ElasticSearch adapter
 *
 * @param settings
 * @param fn
 * @returns {*}
 * @constructor
 */
function adapter( options ) {
  adapter.debug( 'constructor' );

  // Configure dynamic settings.
  Object.defineProperties( this, {
    identity: {
      value: require( '../package' ).name,
      enumerable: true
    },
    options: {
      value: options || {},
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
 * adapter Instance methods.
 *
 */
Object.defineProperties( adapter.prototype, {
  registerCollection: {
    /**
     * One of the earliest methods called when a collection is added.
     *
     * @param collection
     * @param cb
     * @returns {*}
     */
    value: function registerCollection( collection, cb ) {
      adapter.debug( 'registerCollection [identity:%s]', collection.identity );

      if( 'undefined' === typeof this.connection ) {
        return adapter.createConnection.call( this, collection.config || {}, cb );
      }

      cb();

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  create: {
    /**
     * Create Object.
     *
     * @param collectionName
     * @param data
     * @param cb
     * @returns {*}
     */
    value: function create( collectionName, data, cb ) {
      adapter.debug( 'create [collectionName:%s]', collectionName );

      // @todo I don't know what the fuck the below is supposed to do... -potanin@UD
      if( !adapter.utility.isPlainObject( data ) ) {
        //var type    = data.type;
        //var body    = data.body[0];
        //var options = data.body.length === 2 ? body[1] : null;
      }

      this.connection.index( collectionName, data.type || '_waterline', data, function( error, response ) {
        adapter.debug( 'create.index.callback [%s]', error || response );

        if ( error ) {
          return cb( error, null );
        }

        cb( null, response );

      });

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  find: {
    value: function find( collectionName, options, cb ) {
      adapter.debug( 'find( %s )', collectionName );

      this.connection.search({

        index: collectionName

      }, function( error, response ) {

        if ( error ) cb( error, null );

        cb( null, response && response.hits ? response.hits : null );

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
      adapter.debug( 'update( %s )', collectionName );

      var type    = data.type;
      var body    = data.body[0];
      var options = data.body[1];

      this.connection.index( collectionname, type, body, options, function( error, response ) {
        if ( error ) return cb( error, null );
        cb( null, response );
      });

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  destroy: {
    value: function destroy( collectionName, options, cb ) {
      adapter.debug( 'destroy( %s )', collectionName );

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
  teardown: {
    value: function teardown( cb ) {
      adapter.debug( 'teardown()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  describe: {
    value: function describe( collectionName, cb ) {
      adapter.debug( 'describe( %s )', collectionName );

      this.connection.getMapping( '_all', function( error, data ) { cb( null, data.properties ) });

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
      adapter.debug( 'define( %s )', collectionName, definition );

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
      adapter.debug( 'drop( %s )', collectionName );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  native: {
    value: function _native( collection, cb ) {
      adapter.debug( 'native()' );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  createEach: {
    value: function createEach( collectionName, data, cb ) {
      adapter.debug( 'createEach( %s )', collectionName );

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
      adapter.debug( 'stream( %s )', collectionName );

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
      adapter.debug( 'query( %s )', collectionName );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  addAttribute: {
    value: function addAttribute( collectionName, attrName, attrDef, cb ) {
      adapter.debug( 'addAttribute( %s )', collectionName );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  removeAttribute: {
    value: function removeAttribute( collectionName, attrName, cb ) {
      adapter.debug( 'removeAttribute( %s )', collectionName );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});

/**
 * adapter Constructor methods.
 */
Object.defineProperties( module.exports = adapter, {
  create: {
    /**
     * Instantiation helper.
     *
     * @param settings
     * @returns {adapter}
     */
    value: function create( options ) {
      return new adapter( options || {} );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  debug: {
    value: require( 'debug' )( 'waterline:elasticsearch' ),
    enumerable: false,
    configurable: false,
    writable: true
  },
  defaults: {
    value: {
      host: 'localhost',
      port: 9200,
      schema: false,
      nativeParser: false,
      safe: true,
      url: null
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
      adapter.debug( 'createConnection()' );

      var elastical = require( 'elastical' );

      // Instantiate Elastical client.
      this.connection = new elastical.Client( config.url, {
        port: config.port || 9200,
        auth: config.auth || null
      });

      // Make simple request to verify connectivity.
      this.connection.getMapping( '_all', function( error, data ) { cb( error, data ? data.properties : null ) });

      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  utility: {
    value: require( './utility' ),
    enumerable: false,
    configurable: false,
    writable: true
  }
});
