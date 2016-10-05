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

interface Position {
    top : number,
    left : number,
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

function getOffset(event : MouseEvent, bounds : ClientRect, offset : Position) : Position {
    const collideVertically : boolean = (windowDimensions.height + window.scrollY) - event.pageY - offset.top - bounds.height < 0;
    const collideHorizontally : boolean = (windowDimensions.width + window.scrollX) - event.pageX - offset.left - bounds.width < 0;

    return {
        top: collideVertically ? event.pageY - bounds.height - offset.top : offset.top + event.pageY,
        left: collideHorizontally ? event.pageX - bounds.width - offset.left : event.pageX + offset.left
    };
}

const defaultOffset : Position = { top: 10, left: 10 };
function getOffsetSettings(offset? : Offset) : Position {
    if (!offset) return defaultOffset;
    return {
        top: offset.top === undefined ? defaultOffset.top : offset.top,
        left: offset.left === undefined ? defaultOffset.left : offset.left
    };
}

export default function d3scription<T> (contentGetter : ContentGetter<T>, options:Options = {}) {
    const offsetSettings : Position = getOffsetSettings(options.offset);

    return function (element : d3.Selection<any>) : Tip<T> {
        const tip : d3.Selection<any> = d3.select('body')
            .append('div')
            .attr('class', options.class || 'd3scription-tip')
            .style('position', 'absolute')
            .style('z-index', options.zIndex || 100)
            .style('visibility', 'hidden');

        function setupTracking(element : d3.Selection<any>) : void {
            element.on('mousemove', () : void => {
                const bounds : ClientRect = tip.node().getBoundingClientRect();
                const position : Position = getOffset(d3.event, bounds, offsetSettings)

                tip
                    .style("top", `${position.top}px`)
                    .style("left", `${position.left}px`);
            });
        }
        setupTracking(element);

        const publicMethods : Tip<T> = {
            setElement(element : d3.Selection<any>) : void {
                setupTracking(element);
            },
            show(data : T) : void {
                tip.html(contentGetter(data));
                tip.style('visibility', 'visible');
            },
            hide() : void {
                tip.style('visibility', 'hidden');
            },
            destroy() : void {
                tip.remove();
            }
        };

        return publicMethods;
    };
}

// export as Global Object
if (typeof window === 'object') {
    window['d3scription'] = d3scription;
}
