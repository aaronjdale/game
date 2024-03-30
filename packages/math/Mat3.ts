import { Vec2 } from "./Vec2";

const NUM_ELEMENTS = 9;

export class Mat3 {
    values: Array<number>;

    /**
     *
     */
    constructor() {
        (this.values = []).length = NUM_ELEMENTS;
        Mat3.identity(this);
    }

    /**
     *
     * @param values
     * @returns
     */
    set(values: Array<number>) {
        this.values = [...values];
        return this;
    }

    /**
     *
     * @returns
     */
    identity() {
        return Mat3.identity(this);
    }

    /**
     *
     * @param out
     * @returns
     */
    static identity(out: Mat3 = new Mat3()): Mat3 {
        out.values.fill(0);
        out.values[0] = out.values[4] = out.values[8] = 1;
        return out;
    }

    /**
     *
     * @param t
     * @param out
     * @returns
     */
    static translation(t: Vec2, out: Mat3 = new Mat3()): Mat3 {
        const values = [1, 0, 0, 0, 1, 0, t.x, t.y, 1];
        return out.set(values);
    }

    /**
     *
     * @param radians
     * @param out
     * @returns
     */
    static rotation(radians: number, out: Mat3 = new Mat3()): Mat3 {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        const values = [c, -s, 0, s, c, 0, 0, 0, 1];
        return out.set(values);
    }

    /**
     *
     * @param scale
     * @param out
     * @returns
     */
    static scaling(scale: Vec2 | number, out: Mat3 = new Mat3()): Mat3 {
        let sx = 1.0;
        let sy = 1.0;
        if (scale instanceof Vec2) {
            sx = scale.x;
            sy = scale.y;
        } else {
            sx = sy = scale;
        }

        const values = [sx, 0, 0, 0, sy, 0, 0, 0, 1];
        return out.set(values);
    }

    /**
     *
     * @param a
     * @param b
     * @param out
     * @returns
     */
    static multiply(a: Mat3, b: Mat3, out: Mat3 = new Mat3()): Mat3 {
        const a00 = a.values[0 * 3 + 0];
        const a01 = a.values[0 * 3 + 1];
        const a02 = a.values[0 * 3 + 2];
        const a10 = a.values[1 * 3 + 0];
        const a11 = a.values[1 * 3 + 1];
        const a12 = a.values[1 * 3 + 2];
        const a20 = a.values[2 * 3 + 0];
        const a21 = a.values[2 * 3 + 1];
        const a22 = a.values[2 * 3 + 2];
        const b00 = b.values[0 * 3 + 0];
        const b01 = b.values[0 * 3 + 1];
        const b02 = b.values[0 * 3 + 2];
        const b10 = b.values[1 * 3 + 0];
        const b11 = b.values[1 * 3 + 1];
        const b12 = b.values[1 * 3 + 2];
        const b20 = b.values[2 * 3 + 0];
        const b21 = b.values[2 * 3 + 1];
        const b22 = b.values[2 * 3 + 2];

        const values = [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ];
        return out.set(values);
    }
}
