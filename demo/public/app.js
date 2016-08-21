(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _scrollx = require('../../lib/scrollx');

var _scrollx2 = _interopRequireDefault(_scrollx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = [{
  'key': 'first-step',
  'wrapper': '#first-step',
  'timeFactor': 1,
  'animations': [{ // title
    'key': 'titleFadeOut',
    'selector': '.title',
    'steps': [{
      'start': '0%',
      'duration': '100%',
      'properties': {
        'translateY': { 'from': '0%', 'to': '-100%' },
        'color': { 'from': (0, _scrollx.Color)(0, 0, 0, 1), 'to': (0, _scrollx.Color)(255, 255, 255, 1) }
      }
    }]
  }, { // title
    'key': 'titleFadeIn',
    'selector': '.title2',
    'steps': [{
      'start': '0%',
      'duration': '100%',
      'properties': {
        'translateY': { 'from': '100%', 'to': '0%' },
        'opacity': { 'from': 0, 'to': 1 }
      }
    }]
  }]
}, {
  'key': 'second-step',
  'wrapper': '#second-step',
  'timeFactor': 1,
  'animations': [{ // title
    'key': 'titleFadeOut',
    'selector': '.title',
    'steps': [{
      'start': '0%',
      'duration': '100%',
      'properties': {
        'translateY': { 'from': '0%', 'to': '-100%' },
        'color': { 'from': (0, _scrollx.Color)(0, 0, 0, 1), 'to': (0, _scrollx.Color)(255, 255, 255, 1) }
      }
    }]
  }, { // title
    'key': 'titleFadeIn',
    'selector': '.title2',
    'steps': [{
      'start': '0%',
      'duration': '100%',
      'properties': {
        'translateY': { 'from': '100%', 'to': '0%' },
        'opacity': { 'from': 0, 'to': 1 }
      }
    }]
  }]
}];

var animationNode = document.querySelector('#my-animation');
(0, _scrollx2.default)(animationNode, options);

},{"../../lib/scrollx":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = undefined;

var _json = require('./utils/json');

var _dom = require('./utils/dom');

var _frame = require('./utils/frame');

/* Transition functions
-------------------------------------------------- */
//t : currentTime
//b: start value
//c: change in value
//d: duration

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

function linear(t, b, c, d) {
  return c * t / d + b;
}

function easeInQuad(t, b, c, d) {
  t /= d;
  return c * t * t + b;
}

function easeOutQuad(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
}

/*  Globals
-------------------------------------------------- */
var Axis = { Y: 'y', X: 'x' };
var Property = {
  TranslateY: 'translateY',
  TranslateX: 'translateX',
  Opacity: 'opacity',
  Scale: 'scale',
  Color: 'color',
  Fill: 'fill',
  Width: 'width',
  Top: 'top',
  Left: 'left',
  Bottom: 'bottom',
  Right: 'right'
};

var Timing = {
  EASE_IN_OUT: easeInOutQuad,
  EASE_IN: easeInQuad,
  EASE_OUT: easeOutQuad,
  LINEAR: linear
};
var defaultTransition = Timing.EASE_IN_OUT;

var animOffset = 0;
var animHeight = 0;
var scrollTop = function scrollTop() {
  return window.scrollY - animOffset;
};

var Color = function Color(red, green, blue) {
  var opacity = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

  return { r: parseInt(red), g: parseInt(green), b: parseInt(blue), a: opacity };
};

function filmDuration(convertedScenes, animationNode) {
  //in PX
  return convertedScenes.reduce(function (acc, scene) {
    var sceneHeight = _dom.DOM.querySelector(scene.wrapper, animationNode).clientHeight;
    return acc + scene.timeFactor * sceneHeight;
  }, 0);
}

function getIndex(scenes, scene) {
  return scenes.indexOf(scene);
}

function sceneStart(scenes, scene) {
  //in PX
  var startIndex = getIndex(scenes, scene);
  var previousScenes = scenes.slice(0, startIndex);

  return previousScenes.reduce(function (acc, s) {
    return acc + s.timeFactor * window.innerHeight;
  }, 0);
}

function sceneDuration(scene) {
  //in PX
  return scene.timeFactor * window.innerHeight;
}

function sceneEnd(scenes, scene) {
  return sceneStart(scenes, scene) + sceneDuration(scene);
}

function animationStepStart(scenes, scene, step, animTimeFactor) {
  // in px
  var start = sceneStart(scenes, scene);
  return start + pixelsOfScene(step.start, animTimeFactor, Axis.Y);
}

function animationStepDuration(scene, step, animTimeFactor) {
  // in px
  return pixelsOfScene(step.duration, animTimeFactor, Axis.Y);
}

function negativePercent(value) {
  return (/^-.+\%$/.test(value)
  );
}

function pixelsOfScene(value, timeFactor, axis) {
  //in px
  if (typeof value === "string" && value.match(/%/g)) {
    if (axis === 'y') return parseFloat(value) / 100 * window.innerHeight * timeFactor;
    if (axis === 'x') return parseFloat(value) / 100 * window.innerWidth * timeFactor;
  }
}

function convertedValueOfAnimatedElement(elem, value, axis) {
  if (typeof value === "string" && value.match(/%/g)) {
    if (axis === 'y') return parseFloat(value) / 100 * elem.clientHeight;
    if (axis === 'x') return parseFloat(value) / 100 * elem.clientWidth;
  } else {
    return value;
  }
}

function convertScenes(scenes, computed) {
  return scenes.map(function (scene, index) {
    var animations = convertAnimations(scenes, computed, scene, index);
    return _json.Json.merge(scene, { 'animations': animations });
  });
}

function convertAnimations(scenes, computed, scene, sceneIndex) {
  return scene.animations.map(function (a, index) {
    var steps = convertAnimationSteps(scenes, computed, scene, sceneIndex, a);
    return _json.Json.merge(a, { 'steps': steps });
  });
}

function convertAnimationSteps(scenes, computed, scene, sceneIndex, animation) {
  return animation.steps.map(function (step, index) {
    var timeF = negativePercent(step.start) ? scenes[sceneIndex - 1].timeFactor : scene.timeFactor;
    var animStartHeight = animationStepStart(scenes, scene, step, timeF);
    var animDurationHeight = animationStepDuration(scene, step, scene.timeFactor);
    var updatedAnimation = _json.Json.merge(animation, { 'start': animStartHeight, 'duration': animDurationHeight });
    var properties = convertProperties(computed, scene, animation, step);
    return _json.Json.merge(updatedAnimation, { 'properties': properties });
  });
}

function convertProperties(computed, scene, animation, step) {
  return _json.Json.map(step.properties, function (key, value) {
    var node = computed[scene.key].animations[animation.key].node;
    var axis = null;
    switch (key) {
      case Property.TranslateX:case Property.Top:case Property.Bottom:case Property.GrowthX:
        axis = Axis.X;
      case Property.TranslateY:case Property.Left:case Property.Right:case Property.GrowthY:
        axis = Axis.Y;
    }

    var animFrom = convertedValueOfAnimatedElement(node, value.from, axis);
    var animTo = convertedValueOfAnimatedElement(node, value.to, axis);
    return buildProp(animFrom, animTo);
  });
}

function buildProp(from, to) {
  return { 'from': from, 'to': to };
}

function compute(scenes, animationNode) {
  //computedValue With Dom Ref
  var computed = analyseDOM(scenes, animationNode);
  //convert relative percents with px value of the total film
  var convertedScenes = convertScenes(scenes, computed);

  var duration = filmDuration(convertedScenes, animationNode);
  animationNode.style.height = String(duration) + 'px';
  animOffset = getAnimationOffset(animationNode);
  animHeight = duration;

  //change height property of the film in the DOM
  run(convertedScenes, computed);
}

function getAnimationOffset(elem) {
  // crossbrowser version
  var box = elem.getBoundingClientRect();
  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var clientTop = docEl.clientTop || body.clientTop || 0;

  return Math.round(box.top + scrollTop - clientTop);
}

function setup(animationNode, options) {
  //one time actions
  //~~~~~~~~~~~~~~~~~~~
  var scenes = options;
  compute(scenes, animationNode);
  //reset calculations if window size has changed
  window.addEventListener('resize', compute);
}

function analyseDOM(scenes, animationNode) {
  return scenes.reduce(function (sceneAcc, s) {
    var scene = _dom.DOM.querySelector(s.wrapper, animationNode);
    var animations = s.animations.reduce(function (animAcc, a) {
      var animation = _dom.DOM.querySelector(a.selector, scene);
      var computedAnim = {};
      computedAnim[a.key] = { 'node': animation };
      return _json.Json.merge(animAcc, computedAnim);
    }, {});
    var computedScene = {};
    computedScene[s.key] = { 'node': scene, 'start': sceneStart(scenes, s), 'animations': animations };
    return _json.Json.merge(sceneAcc, computedScene);
  }, {});
}

function computeProperty(step, propValue) {
  var transitionFunc = step.transition || defaultTransition;
  if (scrollTop() <= step.start) return propValue.from;else if (scrollTop() >= step.start + step.duration) return propValue.to;else return transitionFunc(scrollTop() - step.start, propValue.from, propValue.to - propValue.from, step.duration);
}

function computeColor(step, colorValue) {
  var colorAsValues = [{ from: colorValue.from.r, to: colorValue.to.r }, { from: colorValue.from.g, to: colorValue.to.g }, { from: colorValue.from.b, to: colorValue.to.b }, { from: colorValue.from.a, to: colorValue.to.a }];
  return colorAsValues.map(function (c) {
    return computeProperty(step, c);
  });
}

function getDefaultPropertyValue(property) {
  switch (property) {
    case Property.TranslateX:
      return 0;
    case Property.TranslateY:
      return 0;
    case Property.Scale:
      return 1;
    case Property.Opacity:
      return 1;
    default:
      return null;
  }
}

function calcPropValue(step, property) {
  var propValue = step.properties[property];
  if (propValue) {
    switch (property) {
      case Property.Opacity:
        return Math.abs(computeProperty(step, propValue));
      case Property.Color:case Property.Fill:
        var c = computeColor(step, propValue);
        return Color(c[0], c[1], c[2], c[3]);
      default:
        return computeProperty(step, propValue);
    }
  } else {
    return getDefaultPropertyValue(property);
  }
}

function getCurrentStep(steps) {
  var matchedStep = steps.find(function (step) {
    return scrollTop() >= step.start && scrollTop() <= step.start + step.duration || step.start >= scrollTop();
  });
  var matchedIndexOf = steps.indexOf(matchedStep);
  var matchedIndex = matchedIndexOf > -1 ? matchedIndexOf : steps.length - 1;
  return steps[matchedIndex];
}

function computeAnimationProperties(steps) {
  var currentStep = getCurrentStep(steps);
  var computed = Object.keys(Property).reduce(function (acc, propKey) {
    var obj = {};
    obj[Property[propKey]] = calcPropValue(currentStep, Property[propKey]);
    return _json.Json.merge(acc, obj);
  }, {});

  return _json.Json.filter(function (p) {
    return p !== null;
  }, computed);
}

function setCssProperties(node, properties) {
  node.style.transform = 'translate3d(' + properties[Property.TranslateX] + 'px, ' + properties[Property.TranslateY] + 'px, 0) scale(' + properties[Property.Scale] + ')';
  node.style.opacity = properties[Property.Opacity];
  if (properties[Property.Color]) node.style.color = 'rgba(' + properties[Property.Color].r + ', ' + properties[Property.Color].g + ', ' + properties[Property.Color].b + ', ' + properties[Property.Color].a + ')';
  if (properties[Property.Fill]) node.style.fill = 'rgba(' + properties[Property.Fill].r + ', ' + properties[Property.Fill].g + ', ' + properties[Property.Fill].b + ', ' + properties[Property.Fill].a + ')';
  if (properties[Property.Width]) node.style.width = properties[Property.Width] + 'px';
  if (properties[Property.Top]) node.style.top = properties[Property.Top] + 'px';
  if (properties[Property.Left]) node.style.left = properties[Property.Left] + 'px';
  if (properties[Property.Bottom]) node.style.bottom = properties[Property.Bottom] + 'px';
  if (properties[Property.Right]) node.style.right = properties[Property.Right] + 'px';
}

function animateElements(convertedScenes, computed) {
  convertedScenes.map(function (s) {
    s.animations.map(function (a) {
      var node = computed[s.key].animations[a.key].node;
      var properties = computeAnimationProperties(a.steps);
      setCssProperties(node, properties);
    });
  });
}

function run(convertedScenes, computed) {
  _frame.Frame.requestAnimationFrame()(function () {
    if (scrollTop() >= 0 && scrollTop() <= animHeight) {
      animateElements(convertedScenes, computed);
    }
    run(convertedScenes, computed);
  });
}

exports.default = setup;
exports.Color = Color;

},{"./utils/dom":3,"./utils/frame":4,"./utils/json":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}]},{},[1]);
