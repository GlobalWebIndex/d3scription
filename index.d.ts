/// <reference path="d/d3.d.ts" />
export interface Offset {
    top?: number;
    left?: number;
}
export interface Options {
    zIndex?: number;
    class?: string;
    offset?: Offset;
}
export interface ContentGetter<T> extends Function {
    (data: T): string;
}
export interface Tip<T> {
    setElement(element: d3.Selection<any>): void;
    show(data: T): void;
    hide(): void;
    destroy(): void;
}
export default function d3scription<T>(contentGetter: ContentGetter<T>, options?: Options): (element: d3.Selection<any>) => Tip<T>;
