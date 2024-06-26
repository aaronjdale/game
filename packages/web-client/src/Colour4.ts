export class Color4 {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export const Colours = {
    CornflowerBlue: new Color4(100 / 255, 149 / 255, 237 / 255, 255 / 255),
};
