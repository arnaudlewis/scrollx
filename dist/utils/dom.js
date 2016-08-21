"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DOM = exports.DOM = {
  querySelector: function querySelector(selector, parentNode) {
    var parent = parentNode || document;
    if (selector) {
      var node = parent.querySelector(selector);
      if (!node) console.error("Unable to find node with selector --> " + selector + " <-- for the given parent node");
      return node;
    } else {
      console.error("Invalid selector --> " + selector);
    }
    return selector ? parent.querySelector(selector) : null;
  }
};