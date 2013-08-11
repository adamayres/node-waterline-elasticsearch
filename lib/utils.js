/**
 * Helper Utility Collection
 *
 * @author potanin@UD
 * @date 6/17/13
 */
function Utility() {
  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;
}

/**
 * SelectableConstructor Properties.
 *
 */
Object.defineProperties( module.exports = Utility, {
  convert_to_elastic: {
    /**
     * Converts a Waterline model to ElasticSearch document.
     *
     * @param values
     * @param collection
     * @param db
     * @param cb
     */
    value: function convert_to_elastic( values,collection,db,cb ){
      var schema = collection.schema;

      async.forEach(Object.keys(schema), function(key,callback){
          if (!values[key]){
            return callback();
          }
          else if (schema[key].required){
            return callback("Required field missing");
          }
          else if (schema[key].type === 'date'){
            var date = new Date(values[key]).toISOString().split("T");
            date = date[0].split("-").concat(date[1].split(":"));
            for (var i = 0; i < date.length; ++i){
              date[i] = parseInt(date[i]);
            }
            values[key] = date;
            return callback();
          }
          else if (schema[key].autoIncrement === true && key != "id"){
            exports.getAutoIncrement(collection.identity,key,db,function(err,value){
              if (err) return callback(err);
              values[key] = value;
              return callback();
            });
          }
          else{
            return callback();
          }
        },function(err){
        if (values.id && values.rev){
          values._id = values.id.toString();
          values._rev = values.rev.toString();
          delete values.id;
          delete values.rev;
        }

        return cb(err,values);
      });

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  from_elastic: {
    /**
     * Converts ElasticSearch document to Waterline Model
     *
     * @param models
     * @param schema
     * @returns {Array}
     */
    value: function from_elastic( models, schema ){

      var results = [];
      _.each(Object.keys(schema),function(key){
        if (typeof schema[key] === 'function'){
          _.each(models,function(model){
            model[key] = schema[key];
          });
        }else if (schema[key].type === 'date'){
          _.each(models,function(model){
            if (model.doc[key]){
              model.doc[key] = new Date(Date.UTC(model.doc[key][0],model.doc[key][1]-1,model.doc[key][2],
                model.doc[key][3],model.doc[key][4],model.doc[key][5]));
            }
          });
        }
      });
      _.each(models,function(model){
        var result = model.doc;
        result.id = result._id;
        delete result._id;
        result.rev = result._rev;
        delete result._rev;
        result.createdAt = new Date(result.createdAt);
        result.updatedAt = new Date(result.updatedAt);
        results.push(result);
      });
      return results;


    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  merge: {
    value: function merge (a, b){
      if (a && b) {
        for (var key in b) {
          a[key] = b[key];
        }
      }
      return a;
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  parse_url: {
    value: require( 'url' ).parse,
    enumerable: true,
    writable: true,
    configurable: true
  },
  extend: {
    value: require( 'extend' ),
    enumerable: false,
    writable: true,
    configurable: true
  },
  pluck: {
    value: require( 'pluck' ),
    enumerable: true,
    configurable: true,
    writable: true
  }
})