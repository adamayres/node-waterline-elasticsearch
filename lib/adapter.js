/**
 * Waterline ElasticSearch adapter
 *
 * @param settings
 * @param fn
 * @returns {*}
 * @constructor
 */
function adapter( options ) {

  // Force Instantiation.
  if( !( this instanceof adapter ) ) {
    return adapter.create( options || {} );
  }

  // Configure dynamic settings.
  Object.defineProperties( this, {
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

  /**
   * Administrative.
   *
   */
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

      Object.defineProperty( this, 'identity', {
        value: require( '../package' ).name,
        enumerable: true,
        writable: true
      });

      Object.defineProperty( this, 'syncable', {
        value: true,
        enumerable: true
      });

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
  utility: {
    value: require( './common/utility' ),
    enumerable: false
  },

  /**
   * CRUD Related.
   *
   */
  define: {
    /**
     * Define Collection Schema.
     *
     * Creates the database if it does not already exist
     *
     * @param path {String} Name taken from tableName, it seems.
     * @param definition {Object} Schema.
     * @param cb
     * @returns {*}
     */
    value: function define( path, definition, cb ) {
      adapter.debug( 'define( %s )', path, definition );

      cb( null, {} );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  create: {
    /**
     * Creates only if there isn't already a document there.
     *
     * @param path
     * @param data
     * @param cb
     * @returns {*}
     */
    value: function create( path, data, cb ) {
      adapter.debug( 'create [path:%s]', path );

      this.connection.index( path, data, function( error, response ) {
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
  update: {
    /**
     * Updates Existing.
     *
     * @param path
     * @param options
     * @param values
     * @param cb
     * @returns {*}
     */
    value: function update( path, options, values, cb ) {
      adapter.debug( 'update( %s )', path );

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
    /**
     * Delete one or more models from the collection
     *
     * @param path
     * @param options
     * @param cb
     * @returns {*}
     */
    value: function destroy( path, options, cb ) {
      adapter.debug( 'destroy( %s )', path );

      var opts    = options.where;

      var index   = path;
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
  drop: {
    value: function drop( path, cb ) {
      adapter.debug( 'drop( %s )', path );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  describe: {
    /**
     * Simply returns the schema of the given collection.
     *
     * - Required by Waterline.
     *
     * @param path
     * @param cb
     * @returns {*}
     */
    value: function describe( path, cb ) {
      adapter.debug( 'describe( %s )', path );

      this.connection.getMapping( '_all', function( error, data ) { cb( null, data.properties ) });

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },

  /**
   * Search Related.
   *
   */
  find: {
    /**
     * Find something.
     *
     * Example of what we get from Waterline:
     *  {"where":{"_id":"orEXdQEj274Do1OLiTqU32oW"},"limit":1}
     *
     * @param path
     * @param options
     * @param cb
     * @returns {*}
     */
    value: function find( path, options, cb ) {
      adapter.debug( 'find: [%s] [%s]', path, JSON.stringify( options ) );

      this.connection.search({ _index: path }, function( error, response ) {

        if ( error ) {
          cb( error, null );
        }

        cb( null, response && response.hits ? response.hits : null );

      });

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  findOrCreate: {
    value: function findOrCreate( path, options, cb ) {
      adapter.debug( 'findOrCreate' );

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
     * @param path
     * @param query
     * @param data
     * @param cb
     */
    value: function query( path, query, data, cb ) {
      adapter.debug( 'query( %s )', path );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  facets: {
    /**
     * Facet Query.
     *
     * @param path
     * @param query
     * @param data
     * @param cb
     */
    value: function facets( path, query, cb ) {
      adapter.debug( 'facets( %s )', query );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },

  /**
   * Not Used / Not Supported.
   *
   */
  teardown: {
    value: function teardown( cb ) {
      adapter.debug( 'teardown()' );

      // @chainable
      return this;

    },
    enumerable: false,
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
    value: function createEach( path, data, cb ) {
      adapter.debug( 'createEach( %s )', path );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  stream: {
    /**
     * Streams models to ES.
     *
     * @param path
     * @param options
     * @param stream
     */
    value: function stream( path, options, stream ) {
      adapter.debug( 'stream( %s )', path );

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  addAttribute: {
    value: function addAttribute( path, attrName, attrDef, cb ) {
      adapter.debug( 'addAttribute( %s )', path );

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  removeAttribute: {
    value: function removeAttribute( path, attrName, cb ) {
      adapter.debug( 'removeAttribute( %s )', path );

      // @chainable
      return this;

    },
    enumerable: false,
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
    enumerable: true
  },
  debug: {
    value: require( 'debug' )( 'waterline:elasticsearch' ),
    writable: true
  },
  defaults: {
    value: require( '../package' ),
    enumerable: true
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
      this.connection.getMapping( '_all', function( error, data ) {
        cb( error, data ? data.properties : null )
      });

      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});
