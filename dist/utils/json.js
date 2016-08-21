"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Json = exports.Json = {

  /*
  * Merge a base object with all the key/values of another.
  */
  merge: function merge(obj, part) {
    var res = Object.assign({}, obj);
    Object.keys(part).forEach(function (key) {
      return res[key] = part[key];
    });
    return res;
  },


  /*
  * Returns a new object with only the original object's keys that passed the predicate.
  */
  filter: function filter(predicate, obj) {
    var _this = this;

    return Object.keys(obj).reduce(function (acc, key) {
      if (predicate(obj[key])) {
        var newElem = {};
        newElem[key] = obj[key];
        return _this.merge(acc, newElem);
      } else {
        return acc;
      }
    }, {});
  },


  /*
  * Returns a new object with all its key/values mapped.
  * A tuple (Array of size 2) must be returned from the map function.
  */
  map: function map(obj, fn) {
    var _this2 = this;

    return Object.keys(obj).reduce(function (acc, key) {
      var newElem = {};
      newElem[key] = fn(key, obj[key]);
      return _this2.merge(acc, newElem);
    }, {});
  }
};