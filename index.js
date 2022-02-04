"use strict";
/// <reference path="d/d3.d.ts" />
exports.__esModule = true;
var windowDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
};
function setWindowDimmensions() {
    windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    };
}
var windowResize = window.addEventListener('resize', setWindowDimmensions);
function getOffset(event, bounds, offset) {
    var collideVertically = (windowDimensions.height + window.scrollY) - event.pageY - offset.top - bounds.height < 0;
    var collideHorizontally = (windowDimensions.width + window.scrollX) - event.pageX - offset.left - bounds.width < 0;
    return {
        top: collideVertically ? event.pageY - bounds.height - offset.top : offset.top + event.pageY,
        left: collideHorizontally ? event.pageX - bounds.width - offset.left : event.pageX + offset.left
    };
}
var defaultOffset = { top: 10, left: 10 };
function getOffsetSettings(offset) {
    if (!offset)
        return defaultOffset;
    return {
        top: offset.top === undefined ? defaultOffset.top : offset.top,
        left: offset.left === undefined ? defaultOffset.left : offset.left
    };
}
function d3scription(contentGetter, options) {
    if (options === void 0) { options = {}; }
    var offsetSettings = getOffsetSettings(options.offset);
    return function () {
        var tip = d3.select('body')
            .append('div')
            .attr('class', options["class"] || 'd3scription-tip')
            .style('position', 'absolute')
            .style('z-index', options.zIndex || 100)
            .style('visibility', 'hidden');
        function updateTipPosition() {
            var bounds = tip.node().getBoundingClientRect();
            var position = getOffset(d3.event, bounds, offsetSettings);
            tip
                .style("top", position.top + "px")
                .style("left", position.left + "px");
        }
        function setupTracking(element) {
            element.on('mousemove', updateTipPosition);
        }
        var publicMethods = {
            element: function (element) {
                setupTracking(element);
                return publicMethods;
            },
            show: function (data) {
                updateTipPosition();
                tip.html(contentGetter(data));
                tip.style('visibility', 'visible');
                return publicMethods;
            },
            update: function (data) {
                tip.html(contentGetter(data));
                return publicMethods;
            },
            hide: function () {
                tip.style('visibility', 'hidden');
                return publicMethods;
            },
            remove: function () {
                tip.remove();
            }
        };
        return publicMethods;
    };
}
exports["default"] = d3scription;
// export as Global Object
if (typeof window === 'object') {
    window['d3scription'] = d3scription;
}
