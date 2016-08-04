/// <reference path="d/d3.d.ts" />
import d3 = require('d3');

export interface Options {
    zIndex? : number;
    class? : string;
}

export interface ContentGetter<T> extends Function {
    (data : T) : string;
}

export interface Tip<T> {
    setElement(element : d3.Selection<any>) : void;
    show(data : T) : void;
    hide() : void;
    destroy() : void;
}

export default function<T> (contentGetter : ContentGetter<T>, options : Options) {
    options = options || {};

    return function (element : d3.Selection<any>) : Tip<T> {
        const tip : d3.Selection<any> = d3.select('body')
            .append('div')
            .attr('class', options.class || 'd3scription-tip')
            .style('position', 'absolute')
            .style('z-index', options.zIndex || 100)
            .style('visibility', 'hidden');

        function setupTracking(element : d3.Selection<any>) : void {
            element.on('mousemove', (event : MouseEvent) : void => {
                tip
                    .style("top", `${event.pageY-10}px`)
                    .style("left", `${event.pageX+10}px`);
            });
        }
        setupTracking(element);

        const publicMethods : Tip<T> = {
            setElement(element : d3.Selection<any>) {
                setupTracking(element);
            },
            show(data : T) {
                tip.html(contentGetter.bind(this, data));
                tip.style('visibility', 'visible');
            },
            hide() {
                tip.style('visibility', 'hidden');
            },
            destroy() {
                tip.remove();
            }
        };

        return publicMethods;
    };
}
