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

interface WindowDimensions {
    width : number,
    height : number
}

let windowDimensions : WindowDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
}

function setWindowDimmensions() : void {
    windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

const windowResize = window.addEventListener('resize', setWindowDimmensions);

function getOffset(event, bounds, offset) {
    const collideHorizontally = windowDimensions.width - event.pageX - offset.left - bounds.width < 0;
    const collideVertically = windowDimensions.height - event.pageY - offset.top - bounds.height < 0;

    return {
        top: collideVertically ? event.pageY - bounds.height - offset.top : offset.top + event.pageY,
        left: collideHorizontally ? event.pageX - bounds.width - offset.left : event.pageX + offset.left
    };
}

const defaultOffset : Offset = { top: 10, left: 10 };
function getOffsetSettings(offset? : Offset) : Offset {
    if (!offset) return defaultOffset;
    return {
        top: offset.top === undefined ? defaultOffset.top : offset.top,
        left: offset.left === undefined ? defaultOffset.left : offset.left
    };
}

export default function d3scription<T> (contentGetter : ContentGetter<T>, options:Options = {}) {
    const offsetSettings : Offset = getOffsetSettings(options.offset);

    return function (element : d3.Selection<any>) : Tip<T> {
        const tip : d3.Selection<any> = d3.select('body')
            .append('div')
            .attr('class', options.class || 'd3scription-tip')
            .style('position', 'absolute')
            .style('z-index', options.zIndex || 100)
            .style('visibility', 'hidden');

        function setupTracking(element : d3.Selection<any>) : void {
            element.on('mousemove', () : void => {
                const bounds = tip.node().getBoundingClientRect();
                const position = getOffset(d3.event, bounds, offsetSettings)

                tip
                    .style("top", `${position.top}px`)
                    .style("left", `${position.left}px`);
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
