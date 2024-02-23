export class Colour {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}

export const Colours = {
    CornflowerBlue: new Colour(100 / 255, 149 / 255, 237 / 255, 1),
};
