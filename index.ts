/// <reference path="d/d3.d.ts" />

export interface Offset {
    top? : number;
    left? : number;
}

export interface Options {
    zIndex? : number;
    class? : string;
    offset? : Offset;
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

const defaultOffset : Offset = { top: -10, left: 10 };
function getOffset(offset? : Offset) : Offset {
    if (!offset) return defaultOffset;
    return {
        top: offset.top === undefined ? defaultOffset.top : offset.top,
        left: offset.left === undefined ? defaultOffset.left : offset.left
    };
}

export default function d3scription<T> (contentGetter : ContentGetter<T>, options? : Options) {
    options = options || {};
    const offset : Offset = getOffset(options.offset);

    return function (element : d3.Selection<any>) : Tip<T> {
        const tip : d3.Selection<any> = d3.select('body')
            .append('div')
            .attr('class', options.class || 'd3scription-tip')
            .style('position', 'absolute')
            .style('z-index', options.zIndex || 100)
            .style('visibility', 'hidden');

        function setupTracking(element : d3.Selection<any>) : void {
            element.on('mousemove', () : void => {
                tip
                    .style("top", `${d3.event.pageY + offset.top}px`)
                    .style("left", `${d3.event.pageX + offset.left}px`);
            });
        }
        setupTracking(element);

        const publicMethods : Tip<T> = {
            setElement(element : d3.Selection<any>) {
                setupTracking(element);
            },
            show(data : T) {
                tip.html(contentGetter(data));
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

// export as Global Object
if (window) {
    window['d3scription'] = d3scription;
}
