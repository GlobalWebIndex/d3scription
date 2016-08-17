/// <reference path="../d/mocha.d.ts" />
/// <reference path="../d/chai.d.ts" />
/// <reference path="../d/jsdom.d.ts" />
/// <reference path="../d/d3.d.ts" />

import chai = require('chai');
import jsdom = require('jsdom');
import d3 = require('d3');
import d3scription from '../index';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const window = doc.defaultView;
const document = window.document;
global['window'] = window;
global['document'] = document;
global['d3'] = d3;

interface Data {
    html : string;
}

function simulateEvent(name, target) {
    var e = document.createEvent('MouseEvents');
    e.initEvent(name, true, false);
    target.dispatchEvent(e);
}

describe('with default settings', () => {
    let svg;
    svg = d3.select('body').append('div');
    const factory = d3scription((d:Data) => d.html);

    const data : Data = { html: '<h1>Hi there!</h1>' };

    const circle = svg.select('circle').data(data);
    const circleE = circle.enter().append('circle').attr('cx', 50).attr('cy', 50).attr('r', 50).attr('id', 'c');

    const $circle = circleE._groups[0][0];
    console.log($circle);

    describe('render tip element', () => {
        const tip = factory(circle);

        it('content should be empty by default', () => {
            chai.expect(document.querySelector('.d3scription-tip')).to.exist;
            chai.expect(document.querySelector('.d3scription-tip').innerHTML).to.be.equal('');
        });
    });
});
