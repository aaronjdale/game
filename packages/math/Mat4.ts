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

    /**
     *
     * @param left
     * @param right
     * @param bottom
     * @param top
     * @param near
     * @param far
     * @param out
     * @returns
     */
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

    /**
     *
     * @param fovRadians
     * @param aspect
     * @param near
     * @param far
     * @param out
     * @returns
     */
    static perspective(fovRadians: number, aspect: number, near: number, far: number, out: Mat4 = new Mat4()): Mat4 {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fovRadians);
        const rangeInv = 1.0 / (near - far);
        const values = [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInv, -1, 0, 0, near * far * rangeInv * 2, 0];
        return out.set(values);
    }

    /**
     *
     * @param position
     * @param target
     * @param up
     * @param out
     * @returns
     */
    static lookAt(position: Vec3, target: Vec3, up: Vec3, out: Mat4 = new Mat4()): Mat4 {
        const z = Vec3.normalize(Vec3.subtract(position, target));
        const x = Vec3.normalize(Vec3.cross(up, z));
        const y = Vec3.normalize(Vec3.cross(z, x));

        const values = [x.x, x.y, x.z, 0, y.x, y.y, y.z, 0, z.x, z.y, z.z, 0, position.x, position.y, position.z, 1];
        return out.set(values);
    }

    /**
     *
     * @param a
     * @param b
     * @param out
     * @returns
     */
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

    /**
     *
     * @param m
     * @param out
     * @returns
     */
    static inverse(m: Mat4, out: Mat4 = new Mat4()): Mat4 {
        var m00 = m.values[0 * 4 + 0];
        var m01 = m.values[0 * 4 + 1];
        var m02 = m.values[0 * 4 + 2];
        var m03 = m.values[0 * 4 + 3];
        var m10 = m.values[1 * 4 + 0];
        var m11 = m.values[1 * 4 + 1];
        var m12 = m.values[1 * 4 + 2];
        var m13 = m.values[1 * 4 + 3];
        var m20 = m.values[2 * 4 + 0];
        var m21 = m.values[2 * 4 + 1];
        var m22 = m.values[2 * 4 + 2];
        var m23 = m.values[2 * 4 + 3];
        var m30 = m.values[3 * 4 + 0];
        var m31 = m.values[3 * 4 + 1];
        var m32 = m.values[3 * 4 + 2];
        var m33 = m.values[3 * 4 + 3];
        var tmp_0 = m22 * m33;
        var tmp_1 = m32 * m23;
        var tmp_2 = m12 * m33;
        var tmp_3 = m32 * m13;
        var tmp_4 = m12 * m23;
        var tmp_5 = m22 * m13;
        var tmp_6 = m02 * m33;
        var tmp_7 = m32 * m03;
        var tmp_8 = m02 * m23;
        var tmp_9 = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var tmp_12 = m20 * m31;
        var tmp_13 = m30 * m21;
        var tmp_14 = m10 * m31;
        var tmp_15 = m30 * m11;
        var tmp_16 = m10 * m21;
        var tmp_17 = m20 * m11;
        var tmp_18 = m00 * m31;
        var tmp_19 = m30 * m01;
        var tmp_20 = m00 * m21;
        var tmp_21 = m20 * m01;
        var tmp_22 = m00 * m11;
        var tmp_23 = m10 * m01;

        var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        const values = [
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
        ];
        return out.set(values);
    }
}
