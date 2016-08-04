/// <reference path="../d/d3.d.ts" />
import d3 = require('d3');
import d3scription from '../index';

interface D {
    x : number;
    y : number;
    desc : string;
}

function hi() {
    debugger;
    const data : D[] = [
        {
            x: 50,
            y: 100,
            desc: 'We are your friends...'
        },
        {
            x: 200,
            y: 50,
            desc: 'I love it!'
        }
    ]
    const el = d3.select('#first-example')
        .append('g');

    const tipFactory = d3scription((d : D) => d.desc);
    const tip = tipFactory(el);

    const circles = el.selectAll('.circle')
        .data(data);

    const cEnter = circles.enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('r', 30)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
};

hi();
