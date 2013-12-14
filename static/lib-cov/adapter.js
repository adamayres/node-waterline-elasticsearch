// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_done = function (file, line, express) {
      if (arguments.length === 2) {
        BASE._$jscoverage[file][line] ++;
      } else {
        BASE._$jscoverage_cond[file][line] ++;
        return express;
      }
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "lib/adapter.js",[12,13,17,39,47,62,65,90,93,121,123,126,143,145,147,148,151,152,156,157,158,159,161,168,186,188,189,190,192,193,193,194,198,214,216,218,219,220,221,223,224,224,226,228,232,240,243,261,265,268,293,297,301,302,307,312,334,336,338,344,346,361,363,364,367,368,372,379,396,398,401,402,406,407,411,414,419,434,437,454,457,471,474,483,486,495,498,514,517,526,529,538,541,554,563]);
_$jscoverage_init(_$jscoverage_cond, "lib/adapter.js",[12,147,151,151,193,224,301,344,344,363,367,367,401,406]);
_$jscoverage["lib/adapter.js"].source = ["/**"," * Waterline ElasticSearch adapter"," *"," * @param settings"," * @param fn"," * @returns {*}"," * @constructor"," */","function adapter( options ) {","","  // Force Instantiation.","  if( !( this instanceof adapter ) ) {","    return adapter.create( options || {} );","  }","","  // Configure dynamic settings.","  Object.defineProperties( this, {","    defaults: {","      value: {","        host: 'localhost',","        database: 'default'","      },","      enumerable: true,","      writable: true","    },","    options: {","      value: options || {},","      enumerable: true,","      writable: true","    },","    syncable: {","      value: true,","      enumerable: true,","      writable: true","    }","  });","","  // @chainable","  return this;","","}","","/**"," * adapter Instance methods."," *"," */","Object.defineProperties( adapter.prototype, {","","  /**","   * Administrative.","   *","   */","  registerCollection: {","    /**","     * One of the earliest methods called when a type is added.","     *","     * @param type","     * @param callback","     * @returns {*}","     */","    value: function registerCollection( type, callback ) {","      adapter.debug( 'registerCollection [identity:%s]', type.identity );","","      // Configure dynamic settings.","      Object.defineProperties( this, {","        connection: {","          value: undefined,","          enumerable: false","        },","        defaults: {","          value: {","            host: 'localhost',","            database: 'default'","          },","          enumerable: true,","          writable: true","        },","        identity: {","          value: '_identity',","          enumerable: true,","          writable: true","        },","        client: {","          value: this.options.client ? this.options.client : require( 'elastic-client' ).create(),","          enumerable: true,","          writable: true","        }","      });","","      callback( null );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  utility: {","    value: require( './common/utility' ),","    enumerable: false","  },","","  /**","   * CRUD Related.","   *","   */","  define: {","    /**","     * Define Collection Schema.","     *","     * Creates the database if it does not already exist","     *","     * @param path {String} Name taken from tableName, it seems.","     * @param definition {Object} Schema.","     * @param cb","     * @returns {*}","     */","    value: function define( path, definition, cb ) {","      adapter.debug( 'define( %s )', path );","","      cb( null, {} );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  create: {","    /**","     * Creates only if there isn't already a document there.","     *","     * @param type","     * @param data","     * @param cb","     * @returns {*}","     */","    value: function create( type, data, callback ) {","      adapter.debug( 'create [type:%s]', type );","","      this.client.request( 'post', '/icbl-mtaa-pqbp-hgdt-sgtu/user', data, function( error, body ) {","","        if( error ) {","          return callback( error );","        }","","        if( body && !body.ok ) {","          return callback( new Error( 'Could not save.' ) );","        }","","        // Not sure if this should be done...","        data._id = data._id = body._id;","        data._version = data._version = body._version;","        data._type = data._type = body._type;","        data._index = data._index = body._index;","","        callback( null, data );","","      });","","      //return callback( null, {} );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  update: {","    /**","     * Updates Existing.","     *","     * @param path","     * @param options","     * @param values","     * @param cb","     * @returns {*}","     */","    value: function update( path, options, values, cb ) {","      adapter.debug( 'update( %s )', path );","","      var type    = data.type;","      var body    = data.body[0];","      var options = data.body[1];","","      this.connection.index( type, type, body, options, function( error, response ) {","        if ( error ) return cb( error, null );","        cb( null, response );","      });","","      // @chainable","      return this;","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  destroy: {","    /**","     * Delete one or more models from the type","     *","     * @param path","     * @param options","     * @param cb","     * @returns {*}","     */","    value: function destroy( path, options, cb ) {","      adapter.debug( 'destroy( %s )', path );","","      var opts    = options.where;","","      var index   = path;","      var type    = opts.type;","      var id      = opts.id;","      var options = opts.options ? opts.options : null;","","      this.connection.delete( index, type, id, options, function ( error, response ) {","        if ( error ) cb( error, null );","","        console.log( response );","","        cb( null, response );","      });","","      // @chainable","      return this;","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  drop: {","    value: function drop( path, cb ) {","      adapter.debug( 'drop( %s )', path );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  describe: {","    /**","     * Simply returns the schema of the given type.","     *","     * - Required by Waterline.","     *","     * @param path","     * @param cb","     * @returns {*}","     */","    value: function describe( path, cb ) {","      adapter.debug( 'describe( %s )', path );","","      // this.connection.getMapping( '_all', function( error, data ) { cb( null, data.properties ) });","","      cb( null, {} );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","","  /**","   * Search Related.","   *","   */","  find: {","    /**","     * Find something.","     *","     * Example of what we get from Waterline:","     *  {\"where\":{\"_id\":\"orEXdQEj274Do1OLiTqU32oW\"},\"limit\":1}","     *","     * @param path","     * @param options","     * @param cb","     * @returns {*}","     */","    value: function find( type, query, callback ) {","      adapter.debug( 'find: [%s] [%s]', type, JSON.stringify( query ) );","","      //console.log( this.tableName );","","      this.client.search( query.where, function( error, data ) {","","        // No Results.","        // @todo Should this return an error?","        if( data.hits.total === 0 ) {","          return callback( null, [] );","        }","","        // Have Result.","        // @todo Determine if we should be returhing _source.","        return callback( null, data.hits.hits );","","      });","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  findOne: {","    /**","     * Find Single Model.","     *","     * Notice, this is not recognized by Waterline and is only used when called programatically","     * by other adapter methods, such as from findOrCreate.","     *","     * Also be advised, the native findOne method only accepts two arguments.","     *","     * @param type","     * @param query","     * @param callback","     * @returns {*}","     */","    value: function findOne( type, query, callback ) {","      adapter.debug( 'findOne [type:%s]', type );","","      console.log( 'findOne' );","","      var _query = {","        query: {},","        from: 0,","        size: 10","      };","","      if( query.where && query.where.id ) {","","        _query.query.bool = {","          \"must\": [","            {","              \"query_string\": {","                \"default_field\": [ type, query.where.id ].join( '.' ),","                \"query\": query.where.id","              }","            }","          ],","          \"must_not\": [],","          \"should\": []","        }","","      }","","      this.client.request( 'post', '/_search', _query, function response( error, body ) {","","        if( error ) {","          return callback( error, body );","        }","","        if( body.hits && body.hits.total > 0 ) {","          return callback( null, body.hits.hits );","        }","","        // No results.","        return callback( null );","","      });","","      //return callback( null );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  findOrCreate: {","    /**","     *","     * @param type","     * @param criteria","     * @param values","     * @param callback","     * @returns {*}","     */","    value: function findOrCreate( type, criteria, values, callback ) {","      adapter.debug( 'findOrCreate: [type:%s]', type );","","      this.findOne( type, criteria, function( error, result ) {","","        // Request Failure.","        if( error ) {","          return callback( error );","        }","","        // Have Results.","        if( result ) {","          return calback( null, result );","        }","","        // Nothing found, create.","        this.create( type, values, callback );","","        // @chainable","        return this;","","      }.bind( this ) );","","      // @chainable","      return this;","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  query: {","    /**","     *","     * @param path","     * @param query","     * @param data","     * @param cb","     */","    value: function query( path, query, data, cb ) {","      adapter.debug( 'query( %s )', path );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  facets: {","    /**","     * Facet Query.","     *","     * @param path","     * @param query","     * @param data","     * @param cb","     */","    value: function facets( path, query, cb ) {","      adapter.debug( 'facets( %s )', query );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","","  /**","   * Not Used / Not Supported.","   *","   */","  teardown: {","    value: function teardown( cb ) {","      adapter.debug( 'teardown()' );","","      // @chainable","      return this;","","    },","    enumerable: false,","    configurable: true,","    writable: true","  },","  native: {","    value: function _native( type, cb ) {","      adapter.debug( 'native()' );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  createEach: {","    value: function createEach( path, data, cb ) {","      adapter.debug( 'createEach( %s )', path );","","      // @chainable","      return this;","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  stream: {","    /**","     * Streams models to ES.","     *","     * @param path","     * @param options","     * @param stream","     */","    value: function stream( path, options, stream ) {","      adapter.debug( 'stream( %s )', path );","","      // @chainable","      return this;","","    },","    enumerable: false,","    configurable: true,","    writable: true","  },","  addAttribute: {","    value: function addAttribute( path, attrName, attrDef, cb ) {","      adapter.debug( 'addAttribute( %s )', path );","","      // @chainable","      return this;","","    },","    enumerable: false,","    configurable: true,","    writable: true","  },","  removeAttribute: {","    value: function removeAttribute( path, attrName, cb ) {","      adapter.debug( 'removeAttribute( %s )', path );","","      // @chainable","      return this;","","    },","    enumerable: false,","    configurable: true,","    writable: true","  }","","});","","/**"," * adapter Constructor methods."," */","Object.defineProperties( module.exports = adapter, {","  create: {","    /**","     * Instantiation helper.","     *","     * @param settings","     * @returns {adapter}","     */","    value: function create( options ) {","      return new adapter( options || {} );","    },","    enumerable: true","  },","  debug: {","    value: require( 'debug' )( 'waterline:elasticsearch' ),","    writable: true","  },","  defaults: {","    value: require( '../package' ).config,","    enumerable: true,","    writable: true","  }","});",""];
function adapter(options) {
    _$jscoverage_done("lib/adapter.js", 12);
    if (_$jscoverage_done("lib/adapter.js", 12, !(this instanceof adapter))) {
        _$jscoverage_done("lib/adapter.js", 13);
        return adapter.create(options || {});
    }
    _$jscoverage_done("lib/adapter.js", 17);
    Object.defineProperties(this, {
        defaults: {
            value: {
                host: "localhost",
                database: "default"
            },
            enumerable: true,
            writable: true
        },
        options: {
            value: options || {},
            enumerable: true,
            writable: true
        },
        syncable: {
            value: true,
            enumerable: true,
            writable: true
        }
    });
    _$jscoverage_done("lib/adapter.js", 39);
    return this;
}

_$jscoverage_done("lib/adapter.js", 47);
Object.defineProperties(adapter.prototype, {
    registerCollection: {
        value: function registerCollection(type, callback) {
            _$jscoverage_done("lib/adapter.js", 62);
            adapter.debug("registerCollection [identity:%s]", type.identity);
            _$jscoverage_done("lib/adapter.js", 65);
            Object.defineProperties(this, {
                connection: {
                    value: undefined,
                    enumerable: false
                },
                defaults: {
                    value: {
                        host: "localhost",
                        database: "default"
                    },
                    enumerable: true,
                    writable: true
                },
                identity: {
                    value: "_identity",
                    enumerable: true,
                    writable: true
                },
                client: {
                    value: this.options.client ? this.options.client : require("elastic-client").create(),
                    enumerable: true,
                    writable: true
                }
            });
            _$jscoverage_done("lib/adapter.js", 90);
            callback(null);
            _$jscoverage_done("lib/adapter.js", 93);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    utility: {
        value: require("./common/utility"),
        enumerable: false
    },
    define: {
        value: function define(path, definition, cb) {
            _$jscoverage_done("lib/adapter.js", 121);
            adapter.debug("define( %s )", path);
            _$jscoverage_done("lib/adapter.js", 123);
            cb(null, {});
            _$jscoverage_done("lib/adapter.js", 126);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    create: {
        value: function create(type, data, callback) {
            _$jscoverage_done("lib/adapter.js", 143);
            adapter.debug("create [type:%s]", type);
            _$jscoverage_done("lib/adapter.js", 145);
            this.client.request("post", "/icbl-mtaa-pqbp-hgdt-sgtu/user", data, function(error, body) {
                _$jscoverage_done("lib/adapter.js", 147);
                if (_$jscoverage_done("lib/adapter.js", 147, error)) {
                    _$jscoverage_done("lib/adapter.js", 148);
                    return callback(error);
                }
                _$jscoverage_done("lib/adapter.js", 151);
                if (_$jscoverage_done("lib/adapter.js", 151, body) && _$jscoverage_done("lib/adapter.js", 151, !body.ok)) {
                    _$jscoverage_done("lib/adapter.js", 152);
                    return callback(new Error("Could not save."));
                }
                _$jscoverage_done("lib/adapter.js", 156);
                data._id = data._id = body._id;
                _$jscoverage_done("lib/adapter.js", 157);
                data._version = data._version = body._version;
                _$jscoverage_done("lib/adapter.js", 158);
                data._type = data._type = body._type;
                _$jscoverage_done("lib/adapter.js", 159);
                data._index = data._index = body._index;
                _$jscoverage_done("lib/adapter.js", 161);
                callback(null, data);
            });
            _$jscoverage_done("lib/adapter.js", 168);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    update: {
        value: function update(path, options, values, cb) {
            _$jscoverage_done("lib/adapter.js", 186);
            adapter.debug("update( %s )", path);
            _$jscoverage_done("lib/adapter.js", 188);
            var type = data.type;
            _$jscoverage_done("lib/adapter.js", 189);
            var body = data.body[0];
            _$jscoverage_done("lib/adapter.js", 190);
            var options = data.body[1];
            _$jscoverage_done("lib/adapter.js", 192);
            this.connection.index(type, type, body, options, function(error, response) {
                _$jscoverage_done("lib/adapter.js", 193);
                if (_$jscoverage_done("lib/adapter.js", 193, error)) {
                    _$jscoverage_done("lib/adapter.js", 193);
                    return cb(error, null);
                }
                _$jscoverage_done("lib/adapter.js", 194);
                cb(null, response);
            });
            _$jscoverage_done("lib/adapter.js", 198);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    destroy: {
        value: function destroy(path, options, cb) {
            _$jscoverage_done("lib/adapter.js", 214);
            adapter.debug("destroy( %s )", path);
            _$jscoverage_done("lib/adapter.js", 216);
            var opts = options.where;
            _$jscoverage_done("lib/adapter.js", 218);
            var index = path;
            _$jscoverage_done("lib/adapter.js", 219);
            var type = opts.type;
            _$jscoverage_done("lib/adapter.js", 220);
            var id = opts.id;
            _$jscoverage_done("lib/adapter.js", 221);
            var options = opts.options ? opts.options : null;
            _$jscoverage_done("lib/adapter.js", 223);
            this.connection.delete(index, type, id, options, function(error, response) {
                _$jscoverage_done("lib/adapter.js", 224);
                if (_$jscoverage_done("lib/adapter.js", 224, error)) {
                    _$jscoverage_done("lib/adapter.js", 224);
                    cb(error, null);
                }
                _$jscoverage_done("lib/adapter.js", 226);
                console.log(response);
                _$jscoverage_done("lib/adapter.js", 228);
                cb(null, response);
            });
            _$jscoverage_done("lib/adapter.js", 232);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    drop: {
        value: function drop(path, cb) {
            _$jscoverage_done("lib/adapter.js", 240);
            adapter.debug("drop( %s )", path);
            _$jscoverage_done("lib/adapter.js", 243);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    describe: {
        value: function describe(path, cb) {
            _$jscoverage_done("lib/adapter.js", 261);
            adapter.debug("describe( %s )", path);
            _$jscoverage_done("lib/adapter.js", 265);
            cb(null, {});
            _$jscoverage_done("lib/adapter.js", 268);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    find: {
        value: function find(type, query, callback) {
            _$jscoverage_done("lib/adapter.js", 293);
            adapter.debug("find: [%s] [%s]", type, JSON.stringify(query));
            _$jscoverage_done("lib/adapter.js", 297);
            this.client.search(query.where, function(error, data) {
                _$jscoverage_done("lib/adapter.js", 301);
                if (_$jscoverage_done("lib/adapter.js", 301, data.hits.total === 0)) {
                    _$jscoverage_done("lib/adapter.js", 302);
                    return callback(null, []);
                }
                _$jscoverage_done("lib/adapter.js", 307);
                return callback(null, data.hits.hits);
            });
            _$jscoverage_done("lib/adapter.js", 312);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    findOne: {
        value: function findOne(type, query, callback) {
            _$jscoverage_done("lib/adapter.js", 334);
            adapter.debug("findOne [type:%s]", type);
            _$jscoverage_done("lib/adapter.js", 336);
            console.log("findOne");
            _$jscoverage_done("lib/adapter.js", 338);
            var _query = {
                query: {},
                from: 0,
                size: 10
            };
            _$jscoverage_done("lib/adapter.js", 344);
            if (_$jscoverage_done("lib/adapter.js", 344, query.where) && _$jscoverage_done("lib/adapter.js", 344, query.where.id)) {
                _$jscoverage_done("lib/adapter.js", 346);
                _query.query.bool = {
                    must: [ {
                        query_string: {
                            default_field: [ type, query.where.id ].join("."),
                            query: query.where.id
                        }
                    } ],
                    must_not: [],
                    should: []
                };
            }
            _$jscoverage_done("lib/adapter.js", 361);
            this.client.request("post", "/_search", _query, function response(error, body) {
                _$jscoverage_done("lib/adapter.js", 363);
                if (_$jscoverage_done("lib/adapter.js", 363, error)) {
                    _$jscoverage_done("lib/adapter.js", 364);
                    return callback(error, body);
                }
                _$jscoverage_done("lib/adapter.js", 367);
                if (_$jscoverage_done("lib/adapter.js", 367, body.hits) && _$jscoverage_done("lib/adapter.js", 367, body.hits.total > 0)) {
                    _$jscoverage_done("lib/adapter.js", 368);
                    return callback(null, body.hits.hits);
                }
                _$jscoverage_done("lib/adapter.js", 372);
                return callback(null);
            });
            _$jscoverage_done("lib/adapter.js", 379);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    findOrCreate: {
        value: function findOrCreate(type, criteria, values, callback) {
            _$jscoverage_done("lib/adapter.js", 396);
            adapter.debug("findOrCreate: [type:%s]", type);
            _$jscoverage_done("lib/adapter.js", 398);
            this.findOne(type, criteria, function(error, result) {
                _$jscoverage_done("lib/adapter.js", 401);
                if (_$jscoverage_done("lib/adapter.js", 401, error)) {
                    _$jscoverage_done("lib/adapter.js", 402);
                    return callback(error);
                }
                _$jscoverage_done("lib/adapter.js", 406);
                if (_$jscoverage_done("lib/adapter.js", 406, result)) {
                    _$jscoverage_done("lib/adapter.js", 407);
                    return calback(null, result);
                }
                _$jscoverage_done("lib/adapter.js", 411);
                this.create(type, values, callback);
                _$jscoverage_done("lib/adapter.js", 414);
                return this;
            }.bind(this));
            _$jscoverage_done("lib/adapter.js", 419);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    query: {
        value: function query(path, query, data, cb) {
            _$jscoverage_done("lib/adapter.js", 434);
            adapter.debug("query( %s )", path);
            _$jscoverage_done("lib/adapter.js", 437);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    facets: {
        value: function facets(path, query, cb) {
            _$jscoverage_done("lib/adapter.js", 454);
            adapter.debug("facets( %s )", query);
            _$jscoverage_done("lib/adapter.js", 457);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    teardown: {
        value: function teardown(cb) {
            _$jscoverage_done("lib/adapter.js", 471);
            adapter.debug("teardown()");
            _$jscoverage_done("lib/adapter.js", 474);
            return this;
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    "native": {
        value: function _native(type, cb) {
            _$jscoverage_done("lib/adapter.js", 483);
            adapter.debug("native()");
            _$jscoverage_done("lib/adapter.js", 486);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    createEach: {
        value: function createEach(path, data, cb) {
            _$jscoverage_done("lib/adapter.js", 495);
            adapter.debug("createEach( %s )", path);
            _$jscoverage_done("lib/adapter.js", 498);
            return this;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    stream: {
        value: function stream(path, options, stream) {
            _$jscoverage_done("lib/adapter.js", 514);
            adapter.debug("stream( %s )", path);
            _$jscoverage_done("lib/adapter.js", 517);
            return this;
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    addAttribute: {
        value: function addAttribute(path, attrName, attrDef, cb) {
            _$jscoverage_done("lib/adapter.js", 526);
            adapter.debug("addAttribute( %s )", path);
            _$jscoverage_done("lib/adapter.js", 529);
            return this;
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    removeAttribute: {
        value: function removeAttribute(path, attrName, cb) {
            _$jscoverage_done("lib/adapter.js", 538);
            adapter.debug("removeAttribute( %s )", path);
            _$jscoverage_done("lib/adapter.js", 541);
            return this;
        },
        enumerable: false,
        configurable: true,
        writable: true
    }
});

_$jscoverage_done("lib/adapter.js", 554);
Object.defineProperties(module.exports = adapter, {
    create: {
        value: function create(options) {
            _$jscoverage_done("lib/adapter.js", 563);
            return new adapter(options || {});
        },
        enumerable: true
    },
    debug: {
        value: require("debug")("waterline:elasticsearch"),
        writable: true
    },
    defaults: {
        value: require("../package").config,
        enumerable: true,
        writable: true
    }
});