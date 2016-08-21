"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Frame = exports.Frame = {
  requestAnimationFrame: function requestAnimationFrame() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }
};