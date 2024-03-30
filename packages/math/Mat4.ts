import { Vec3 } from "./Vec3";

const NUM_ELEMENTS = 16;

export class Mat4 {
    values: Array<number>;

    /**
     *
     */
    constructor() {
        (this.values = []).length = NUM_ELEMENTS;
        Mat4.identity(this);
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
        return Mat4.identity(this);
    }

    /**
     *
     * @param out
     * @returns
     */
    static identity(out: Mat4 = new Mat4()) {
        out.values.fill(0);
        out.values[0] = out.values[5] = out.values[10] = out.values[15] = 1;
        return out;
    }

    /**
     *
     * @param t
     * @param out
     * @returns
     */
    static translation(t: Vec3, out: Mat4 = new Mat4()): Mat4 {
        const values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, t.z, 1];
        return out.set(values);
    }

    /**
     *
     * @param radians
     * @param out
     * @returns
     */
    static rotationX(radians: number, out: Mat4 = new Mat4()): Mat4 {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        const values = [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
        return out.set(values);
    }

    /**
     *
     * @param radians
     * @param out
     * @returns
     */
    static rotationY(radians: number, out: Mat4 = new Mat4()): Mat4 {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        const values = [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
        return out.set(values);
    }

    /**
     *
     * @param radians
     * @param out
     * @returns
     */
    static rotationZ(radians: number, out: Mat4 = new Mat4()): Mat4 {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        const values = [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        return out.set(values);
    }

    /**
     *
     * @param scale
     * @param out
     * @returns
     */
    static scaling(scale: Vec3 | number, out: Mat4 = new Mat4()): Mat4 {
        let sx = 1.0;
        let sy = 1.0;
        let sz = 1.0;
        if (scale instanceof Vec3) {
            sx = scale.x;
            sy = scale.y;
            sz = scale.z;
        } else {
            sx = sy = sz = scale;
        }

        const values = [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
        return out.set(values);
    }

    static ortho(
        left: number,
        right: number,
        bottom: number,
        top: number,
        near: number,
        far: number,
        out: Mat4 = new Mat4()
    ): Mat4 {
        const values = [
            2 / (right - left),
            0,
            0,
            0,
            0,
            2 / (top - bottom),
            0,
            0,
            0,
            0,
            2 / (near - far),
            0,

            (left + right) / (left - right),
            (bottom + top) / (bottom - top),
            (near + far) / (near - far),
            1,
        ];
        return out.set(values);
    }

    static perspective(fovRadians: number, aspect: number, near: number, far: number, out: Mat4 = new Mat4()): Mat4 {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fovRadians);
        const rangeInv = 1.0 / (near - far);
        const values = [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInv, -1, 0, 0, near * far * rangeInv * 2, 0];
        return out.set(values);
    }

    static multiply(a: Mat4, b: Mat4, out: Mat4 = new Mat4()): Mat4 {
        const a00 = a.values[0 * 4 + 0];
        const a01 = a.values[0 * 4 + 1];
        const a02 = a.values[0 * 4 + 2];
        const a03 = a.values[0 * 4 + 3];
        const a10 = a.values[1 * 4 + 0];
        const a11 = a.values[1 * 4 + 1];
        const a12 = a.values[1 * 4 + 2];
        const a13 = a.values[1 * 4 + 3];
        const a20 = a.values[2 * 4 + 0];
        const a21 = a.values[2 * 4 + 1];
        const a22 = a.values[2 * 4 + 2];
        const a23 = a.values[2 * 4 + 3];
        const a30 = a.values[3 * 4 + 0];
        const a31 = a.values[3 * 4 + 1];
        const a32 = a.values[3 * 4 + 2];
        const a33 = a.values[3 * 4 + 3];
        const b00 = b.values[0 * 4 + 0];
        const b01 = b.values[0 * 4 + 1];
        const b02 = b.values[0 * 4 + 2];
        const b03 = b.values[0 * 4 + 3];
        const b10 = b.values[1 * 4 + 0];
        const b11 = b.values[1 * 4 + 1];
        const b12 = b.values[1 * 4 + 2];
        const b13 = b.values[1 * 4 + 3];
        const b20 = b.values[2 * 4 + 0];
        const b21 = b.values[2 * 4 + 1];
        const b22 = b.values[2 * 4 + 2];
        const b23 = b.values[2 * 4 + 3];
        const b30 = b.values[3 * 4 + 0];
        const b31 = b.values[3 * 4 + 1];
        const b32 = b.values[3 * 4 + 2];
        const b33 = b.values[3 * 4 + 3];
        const values = [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ];

        return out.set(values);
    }
}
