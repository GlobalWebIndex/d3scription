/// <reference path="../d/d3.d.ts" />
import d3scription from '../index';

interface D {
    x : number;
    y : number;
    desc : string;
}

const data : D[] = [
    {
        x: 30*Math.random()+50,
        y: 100*Math.random()+50,
        desc: 'We are your friends...'
    },
    {
        x: 300*Math.random()+50,
        y: 70*Math.random()+50,
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
