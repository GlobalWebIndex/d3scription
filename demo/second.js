var data = [
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
var el = d3.select('#second-example')
    .append('g');

var tipFactory = d3scription(function(d) { return d.desc; });
var tip = tipFactory(el);

var circles = el.selectAll('.circle')
    .data(data);

var cEnter = circles.enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('r', 30)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
