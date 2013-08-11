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
        port: 27017,
        auth: null
      },
      enumerable: true,
      writable: true
    },
    connection: {
      value: {},
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

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  teardown: {
    value: function teardown( cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  describe: {
    value: function describe( collectionName, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  define: {
    value: function define( collectionName, definition, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  drop: {
    value: function drop( collectionName, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  native: {
    value: function native( collection, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  create: {
    value: function create( collectionName, data, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  createEach: {
    value: function createEach( collectionName, data, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  find: {
    value: function find( collectionName, options, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  update: {
    value: function update( collectionName, options, values, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  destroy: {
    value: function destroy( collectionName, options, cb ) {},
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
    value: function stream( collectionName, options, stream ) {},
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
    value: function query( collectionName, query, data, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  addAttribute: {
    value: function addAttribute( collectionName, attrName, attrDef, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  removeAttribute: {
    value: function removeAttribute( collectionName, attrName, cb ) {},
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
  spawnConnection: {
    value: function spawnConnection( logic, config, cb ) {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  createConnection: {
    value: function createConnection( config, cb ) {},
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
})
