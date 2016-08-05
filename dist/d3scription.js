var d3scription = d3scription || {}; d3scription["d3scription"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="d/d3.d.ts" />
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var defaultOffset = { top: -10, left: 10 };
	    function getOffset(offset) {
	        if (!offset)
	            return defaultOffset;
	        return {
	            top: offset.top === undefined ? defaultOffset.top : offset.top,
	            left: offset.left === undefined ? defaultOffset.left : offset.left
	        };
	    }
	    function d3scription(contentGetter, options) {
	        options = options || {};
	        var offset = getOffset(options.offset);
	        return function (element) {
	            var tip = d3.select('body')
	                .append('div')
	                .attr('class', options.class || 'd3scription-tip')
	                .style('position', 'absolute')
	                .style('z-index', options.zIndex || 100)
	                .style('visibility', 'hidden');
	            function setupTracking(element) {
	                element.on('mousemove', function () {
	                    tip
	                        .style("top", (d3.event.pageY + offset.top) + "px")
	                        .style("left", (d3.event.pageX + offset.left) + "px");
	                });
	            }
	            setupTracking(element);
	            var publicMethods = {
	                setElement: function (element) {
	                    setupTracking(element);
	                },
	                show: function (data) {
	                    tip.html(contentGetter(data));
	                    tip.style('visibility', 'visible');
	                },
	                hide: function () {
	                    tip.style('visibility', 'hidden');
	                },
	                destroy: function () {
	                    tip.remove();
	                }
	            };
	            return publicMethods;
	        };
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    exports.default = d3scription;
	    // export as Global Object
	    if (window) {
	        window['d3scription'] = d3scription;
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);