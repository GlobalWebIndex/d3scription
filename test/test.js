/// <reference path="../d/mocha.d.ts" />
/// <reference path="../d/chai.d.ts" />
/// <reference path="../d/jsdom.d.ts" />
/// <reference path="../d/d3.d.ts" />
"use strict";
var chai = require('chai');
var jsdom = require('jsdom');
var d3 = require('d3');
var index_1 = require('../index');
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
var window = doc.defaultView;
var document = window.document;
global['window'] = window;
global['document'] = document;
global['d3'] = d3;
function simulateEvent(name, target) {
    var e = document.createEvent('MouseEvents');
    e.initEvent(name, true, false);
    target.dispatchEvent(e);
}
describe('with default settings', function () {
    var svg;
    svg = d3.select('body').append('div');
    var factory = index_1["default"](function (d) { return d.html; });
    var data = { html: '<h1>Hi there!</h1>' };
    var circle = svg.select('circle').data(data);
    var circleE = circle.enter().append('circle').attr('cx', 50).attr('cy', 50).attr('r', 50).attr('id', 'c');
    var $circle = circleE._groups[0][0];
    console.log($circle);
    describe('render tip element', function () {
        var tip = factory(circle);
        it('content should be empty by default', function () {
            chai.expect(document.querySelector('.d3scription-tip')).to.exist;
            chai.expect(document.querySelector('.d3scription-tip').innerHTML).to.be.equal('');
        });
    });
});
