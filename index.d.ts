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
    element(element: d3.Selection<any>): Tip<T>;
    show(data: T): Tip<T>;
    hide(): Tip<T>;
    remove(): void;
}
export interface TipFactory<T> extends Function {
    (): Tip<T>;
}
export default function d3scription<T>(contentGetter: ContentGetter<T>, options?: Options): TipFactory<T>;
