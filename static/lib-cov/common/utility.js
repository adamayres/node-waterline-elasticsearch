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
_$jscoverage_init(_$jscoverage, "lib/common/utility.js",[12,20,31,33,34,35,37,38,40,41,42,43,44,46,47,49,50,51,51,52,53,57,60,61,62,63,64,67,85,86,87,88,89,91,92,93,94,100,101,102,103,104,105,106,107,108,110,127,128,129,132,141,142,145,147,148,150,151,154,155,156,159]);
_$jscoverage_init(_$jscoverage_cond, "lib/common/utility.js",[34,37,40,49,49,51,60,60,87,91,93,127,127,141,150,154]);
_$jscoverage["lib/common/utility.js"].source = ["/**"," * Helper Utility Collection"," *"," * @class Utility"," * @constructor"," * @method Utility"," *"," * @author potanin@UD"," * @date 6/17/13"," */","function Utility() {","  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;","}","","/**"," * Utility Properties"," *"," * @for Utility"," */","Object.defineProperties( module.exports = Utility, {","  convert_to_elastic: {","    /**","     * Converts a Waterline model to ElasticSearch document.","     *","     * @param values","     * @param collection","     * @param db","     * @param cb","     */","    value: function convert_to_elastic( values,collection,db,cb ){","      var schema = collection.schema;","","      async.forEach(Object.keys(schema), function(key,callback){","          if (!values[key]){","            return callback();","          }","          else if (schema[key].required){","            return callback(\"Required field missing\");","          }","          else if (schema[key].type === 'date'){","            var date = new Date(values[key]).toISOString().split(\"T\");","            date = date[0].split(\"-\").concat(date[1].split(\":\"));","            for (var i = 0; i < date.length; ++i){","              date[i] = parseInt(date[i]);","            }","            values[key] = date;","            return callback();","          }","          else if (schema[key].autoIncrement === true && key != \"id\"){","            exports.getAutoIncrement(collection.identity,key,db,function(err,value){","              if (err) return callback(err);","              values[key] = value;","              return callback();","            });","          }","          else{","            return callback();","          }","        },function(err){","        if (values.id && values.rev){","          values._id = values.id.toString();","          values._rev = values.rev.toString();","          delete values.id;","          delete values.rev;","        }","","        return cb(err,values);","      });","","    },","    enumerable: true,","    writable: true,","    configurable: true","  },","  from_elastic: {","    /**","     * Converts ElasticSearch document to Waterline Model","     *","     * @param models","     * @param schema","     * @returns {Array}","     */","    value: function from_elastic( models, schema ){","","      var results = [];","      _.each(Object.keys(schema),function(key){","        if (typeof schema[key] === 'function'){","          _.each(models,function(model){","            model[key] = schema[key];","          });","        }else if (schema[key].type === 'date'){","          _.each(models,function(model){","            if (model.doc[key]){","              model.doc[key] = new Date( Date.UTC( model.doc[key][0], model.doc[key][1] - 1, model.doc[key][2],","                model.doc[key][3],model.doc[key][4],model.doc[key][5]));","            }","          });","        }","      });","      _.each(models,function(model){","        var result = model.doc;","        result.id = result._id;","        delete result._id;","        result.rev = result._rev;","        delete result._rev;","        result.createdAt = new Date(result.createdAt);","        result.updatedAt = new Date(result.updatedAt);","        results.push(result);","      });","      return results;","","","    },","    enumerable: true,","    writable: true,","    configurable: true","  },","  merge: {","    /**","     * Simple Merge (not deep)","     *","     * @param a","     * @param b","     * @returns {*}","     */","    value: function merge (a, b){","      if (a && b) {","        for (var key in b) {","          a[key] = b[key];","        }","      }","      return a;","    },","    enumerable: true,","    writable: true,","    configurable: true","  },","  parse_url: {","    value: function parse_url( config ) {","","      if( !Utility.isString( config.url ) ) {","        return config;","      }","","      var obj = url.parse(config.url);","","      config.host = obj.hostname || config.host;","      config.port = obj.port || config.port;","","      if( Utility.isString( obj.path ) ) {","        config.database = obj.path.split(\"/\")[1] || config.database;","      }","","      if( Utility.isString( obj.auth ) ) {","        config.user = obj.auth.split(\":\")[0] || config.user;","        config.password = obj.auth.split(\":\")[1] || config.password;","      }","","      return config;","","    },","    enumerable: true,","    writable: true,","    configurable: true","  },","  extend: {","    value: require( 'lodash' ).extend,","    enumerable: false,","    writable: true,","    configurable: true","  },","  isString: {","    value: require( 'lodash' ).isString,","    enumerable: false,","    writable: true,","    configurable: true","  },","  isPlainObject: {","    value: require( 'lodash' ).isPlainObject,","    enumerable: false,","    writable: true,","    configurable: true","  },","  pluck: {","    value: require( 'lodash' ).pluck,","    enumerable: true,","    configurable: true,","    writable: true","  }","});"];
function Utility() {
    _$jscoverage_done("lib/common/utility.js", 12);
    return Object.keys(arguments) ? require("lodash").pick.apply(null, [ Utility, Array.prototype.slice.call(arguments) ]) : Utility;
}

_$jscoverage_done("lib/common/utility.js", 20);
Object.defineProperties(module.exports = Utility, {
    convert_to_elastic: {
        value: function convert_to_elastic(values, collection, db, cb) {
            _$jscoverage_done("lib/common/utility.js", 31);
            var schema = collection.schema;
            _$jscoverage_done("lib/common/utility.js", 33);
            async.forEach(Object.keys(schema), function(key, callback) {
                _$jscoverage_done("lib/common/utility.js", 34);
                if (_$jscoverage_done("lib/common/utility.js", 34, !values[key])) {
                    _$jscoverage_done("lib/common/utility.js", 35);
                    return callback();
                } else {
                    _$jscoverage_done("lib/common/utility.js", 37);
                    if (_$jscoverage_done("lib/common/utility.js", 37, schema[key].required)) {
                        _$jscoverage_done("lib/common/utility.js", 38);
                        return callback("Required field missing");
                    } else {
                        _$jscoverage_done("lib/common/utility.js", 40);
                        if (_$jscoverage_done("lib/common/utility.js", 40, schema[key].type === "date")) {
                            _$jscoverage_done("lib/common/utility.js", 41);
                            var date = (new Date(values[key])).toISOString().split("T");
                            _$jscoverage_done("lib/common/utility.js", 42);
                            date = date[0].split("-").concat(date[1].split(":"));
                            _$jscoverage_done("lib/common/utility.js", 43);
                            for (var i = 0; i < date.length; ++i) {
                                _$jscoverage_done("lib/common/utility.js", 44);
                                date[i] = parseInt(date[i]);
                            }
                            _$jscoverage_done("lib/common/utility.js", 46);
                            values[key] = date;
                            _$jscoverage_done("lib/common/utility.js", 47);
                            return callback();
                        } else {
                            _$jscoverage_done("lib/common/utility.js", 49);
                            if (_$jscoverage_done("lib/common/utility.js", 49, schema[key].autoIncrement === true) && _$jscoverage_done("lib/common/utility.js", 49, key != "id")) {
                                _$jscoverage_done("lib/common/utility.js", 50);
                                exports.getAutoIncrement(collection.identity, key, db, function(err, value) {
                                    _$jscoverage_done("lib/common/utility.js", 51);
                                    if (_$jscoverage_done("lib/common/utility.js", 51, err)) {
                                        _$jscoverage_done("lib/common/utility.js", 51);
                                        return callback(err);
                                    }
                                    _$jscoverage_done("lib/common/utility.js", 52);
                                    values[key] = value;
                                    _$jscoverage_done("lib/common/utility.js", 53);
                                    return callback();
                                });
                            } else {
                                _$jscoverage_done("lib/common/utility.js", 57);
                                return callback();
                            }
                        }
                    }
                }
            }, function(err) {
                _$jscoverage_done("lib/common/utility.js", 60);
                if (_$jscoverage_done("lib/common/utility.js", 60, values.id) && _$jscoverage_done("lib/common/utility.js", 60, values.rev)) {
                    _$jscoverage_done("lib/common/utility.js", 61);
                    values._id = values.id.toString();
                    _$jscoverage_done("lib/common/utility.js", 62);
                    values._rev = values.rev.toString();
                    _$jscoverage_done("lib/common/utility.js", 63);
                    delete values.id;
                    _$jscoverage_done("lib/common/utility.js", 64);
                    delete values.rev;
                }
                _$jscoverage_done("lib/common/utility.js", 67);
                return cb(err, values);
            });
        },
        enumerable: true,
        writable: true,
        configurable: true
    },
    from_elastic: {
        value: function from_elastic(models, schema) {
            _$jscoverage_done("lib/common/utility.js", 85);
            var results = [];
            _$jscoverage_done("lib/common/utility.js", 86);
            _.each(Object.keys(schema), function(key) {
                _$jscoverage_done("lib/common/utility.js", 87);
                if (_$jscoverage_done("lib/common/utility.js", 87, typeof schema[key] === "function")) {
                    _$jscoverage_done("lib/common/utility.js", 88);
                    _.each(models, function(model) {
                        _$jscoverage_done("lib/common/utility.js", 89);
                        model[key] = schema[key];
                    });
                } else {
                    _$jscoverage_done("lib/common/utility.js", 91);
                    if (_$jscoverage_done("lib/common/utility.js", 91, schema[key].type === "date")) {
                        _$jscoverage_done("lib/common/utility.js", 92);
                        _.each(models, function(model) {
                            _$jscoverage_done("lib/common/utility.js", 93);
                            if (_$jscoverage_done("lib/common/utility.js", 93, model.doc[key])) {
                                _$jscoverage_done("lib/common/utility.js", 94);
                                model.doc[key] = new Date(Date.UTC(model.doc[key][0], model.doc[key][1] - 1, model.doc[key][2], model.doc[key][3], model.doc[key][4], model.doc[key][5]));
                            }
                        });
                    }
                }
            });
            _$jscoverage_done("lib/common/utility.js", 100);
            _.each(models, function(model) {
                _$jscoverage_done("lib/common/utility.js", 101);
                var result = model.doc;
                _$jscoverage_done("lib/common/utility.js", 102);
                result.id = result._id;
                _$jscoverage_done("lib/common/utility.js", 103);
                delete result._id;
                _$jscoverage_done("lib/common/utility.js", 104);
                result.rev = result._rev;
                _$jscoverage_done("lib/common/utility.js", 105);
                delete result._rev;
                _$jscoverage_done("lib/common/utility.js", 106);
                result.createdAt = new Date(result.createdAt);
                _$jscoverage_done("lib/common/utility.js", 107);
                result.updatedAt = new Date(result.updatedAt);
                _$jscoverage_done("lib/common/utility.js", 108);
                results.push(result);
            });
            _$jscoverage_done("lib/common/utility.js", 110);
            return results;
        },
        enumerable: true,
        writable: true,
        configurable: true
    },
    merge: {
        value: function merge(a, b) {
            _$jscoverage_done("lib/common/utility.js", 127);
            if (_$jscoverage_done("lib/common/utility.js", 127, a) && _$jscoverage_done("lib/common/utility.js", 127, b)) {
                _$jscoverage_done("lib/common/utility.js", 128);
                for (var key in b) {
                    _$jscoverage_done("lib/common/utility.js", 129);
                    a[key] = b[key];
                }
            }
            _$jscoverage_done("lib/common/utility.js", 132);
            return a;
        },
        enumerable: true,
        writable: true,
        configurable: true
    },
    parse_url: {
        value: function parse_url(config) {
            _$jscoverage_done("lib/common/utility.js", 141);
            if (_$jscoverage_done("lib/common/utility.js", 141, !Utility.isString(config.url))) {
                _$jscoverage_done("lib/common/utility.js", 142);
                return config;
            }
            _$jscoverage_done("lib/common/utility.js", 145);
            var obj = url.parse(config.url);
            _$jscoverage_done("lib/common/utility.js", 147);
            config.host = obj.hostname || config.host;
            _$jscoverage_done("lib/common/utility.js", 148);
            config.port = obj.port || config.port;
            _$jscoverage_done("lib/common/utility.js", 150);
            if (_$jscoverage_done("lib/common/utility.js", 150, Utility.isString(obj.path))) {
                _$jscoverage_done("lib/common/utility.js", 151);
                config.database = obj.path.split("/")[1] || config.database;
            }
            _$jscoverage_done("lib/common/utility.js", 154);
            if (_$jscoverage_done("lib/common/utility.js", 154, Utility.isString(obj.auth))) {
                _$jscoverage_done("lib/common/utility.js", 155);
                config.user = obj.auth.split(":")[0] || config.user;
                _$jscoverage_done("lib/common/utility.js", 156);
                config.password = obj.auth.split(":")[1] || config.password;
            }
            _$jscoverage_done("lib/common/utility.js", 159);
            return config;
        },
        enumerable: true,
        writable: true,
        configurable: true
    },
    extend: {
        value: require("lodash").extend,
        enumerable: false,
        writable: true,
        configurable: true
    },
    isString: {
        value: require("lodash").isString,
        enumerable: false,
        writable: true,
        configurable: true
    },
    isPlainObject: {
        value: require("lodash").isPlainObject,
        enumerable: false,
        writable: true,
        configurable: true
    },
    pluck: {
        value: require("lodash").pluck,
        enumerable: true,
        configurable: true,
        writable: true
    }
});