import { Vec3 } from "./Vec3";

const m11 = 0;
const m12 = 1;
const m13 = 2;
const m14 = 3;
const m21 = 4;
const m22 = 5;
const m23 = 6;
const m24 = 7;
const m31 = 8;
const m32 = 9;
const m33 = 10;
const m34 = 11;
const m41 = 12;
const m42 = 13;
const m43 = 14;
const m44 = 15;

export class Mat4 {
    elements: number[];

    constructor() {
        (this.elements = []).length = 16;
        Mat4.identity(this);
    }

    /**
     * Sets the specified matrix to the identity matrix
     * @param m
     * @returns
     */
    static identity(m: Mat4) {
        m.elements.fill(0);
        m.elements[m11] = m.elements[m22] = m.elements[m33] = m.elements[m44] = 1;
        return m;
    }

    /**
     * Sets this matrix to an identity matrix
     * @returns
     */
    identity() {
        return Mat4.identity(this);
    }

    static fromArray(a: number[], out = new Mat4()) {
        out.elements = [...a];
        return out;
    }

    fromArray(a: number[]) {
        return Mat4.fromArray(a, this);
    }

    /**
     * Adds matrix 'b' to matrix 'a' and sets matrix 'out' to the result.
     * @param a
     * @param b
     * @param out
     */
    static add(a: Mat4, b: Mat4, out = new Mat4()) {
        if (a.elements.length !== b.elements.length) {
            // todo: sort of getting ahead of different width/height matrices
            // todo: this won't throw as expected if a.rows === b.cols && a.cols === b.rows (elements array will have same length)
            throw new Error("Cannot add matrices of different dimensions");
        }

        for (let i = 0; i < a.elements.length; ++i) {
            out.elements[i] = a.elements[i] + b.elements[i];
        }
    }

    /**
     * Subtracts matrix 'b' from matrix 'a' and sets matrix 'out' to the result.
     * @param a
     * @param b
     * @param out
     */
    static subtract(a: Mat4, b: Mat4, out = new Mat4()) {
        if (a.elements.length !== b.elements.length) {
            // todo: sort of getting ahead of different width/height matrices
            // todo: this won't throw as expected if a.rows === b.cols && a.cols === b.rows (elements array will have same length)
            throw new Error("Cannot add matrices of different dimensions");
        }

        for (let i = 0; i < a.elements.length; ++i) {
            out.elements[i] = a.elements[i] - b.elements[i];
        }
        return out;
    }

    /**
     * Multiplies 'a' matrix by a scalar value
     */
    static multiplyScalar(a: Mat4, n: number, out = new Mat4()) {
        for (let i = 0; i < a.elements.length; ++i) {
            out.elements[i] = a.elements[i] * n;
        }
        return out;
    }

    /**
     *
     * @param row
     * @param col
     * @returns
     */
    static rowColToIndex(row: number, col: number) {
        const rows = 4;
        const cols = 4;

        return row * cols + col;
    }

    /**
     * Multiplies matrix 'a' by matrix 'b' and sets matrix 'out' to the result
     * @param a
     * @param b
     * @param out
     */
    static multiply(a: Mat4, b: Mat4, out = new Mat4()) {
        if (a.elements.length !== b.elements.length) {
            // todo: sort of getting ahead of different width/height matrices
            // todo: this won't throw as expected if a.rows === b.cols && a.cols === b.rows (elements array will have same length)
            throw new Error("Cannot add matrices of different dimensions");
        }

        out.elements[m11] =
            a.elements[m11] * b.elements[m11] +
            a.elements[m12] * b.elements[m21] +
            a.elements[m13] * b.elements[m31] +
            a.elements[m14] * b.elements[m41];
        out.elements[m12] =
            a.elements[m11] * b.elements[m12] +
            a.elements[m12] * b.elements[m22] +
            a.elements[m13] * b.elements[m32] +
            a.elements[m14] * b.elements[m42];
        out.elements[m13] =
            a.elements[m11] * b.elements[m13] +
            a.elements[m12] * b.elements[m23] +
            a.elements[m13] * b.elements[m33] +
            a.elements[m14] * b.elements[m43];
        out.elements[m14] =
            a.elements[m11] * b.elements[m14] +
            a.elements[m12] * b.elements[m24] +
            a.elements[m13] * b.elements[m34] +
            a.elements[m14] * b.elements[m44];
        out.elements[m21] =
            a.elements[m21] * b.elements[m11] +
            a.elements[m22] * b.elements[m21] +
            a.elements[m23] * b.elements[m31] +
            a.elements[m24] * b.elements[m41];
        out.elements[m22] =
            a.elements[m21] * b.elements[m12] +
            a.elements[m22] * b.elements[m22] +
            a.elements[m23] * b.elements[m32] +
            a.elements[m24] * b.elements[m42];
        out.elements[m23] =
            a.elements[m21] * b.elements[m13] +
            a.elements[m22] * b.elements[m23] +
            a.elements[m23] * b.elements[m33] +
            a.elements[m24] * b.elements[m43];
        out.elements[m24] =
            a.elements[m21] * b.elements[m14] +
            a.elements[m22] * b.elements[m24] +
            a.elements[m23] * b.elements[m34] +
            a.elements[m24] * b.elements[m44];
        out.elements[m31] =
            a.elements[m31] * b.elements[m11] +
            a.elements[m32] * b.elements[m21] +
            a.elements[m33] * b.elements[m31] +
            a.elements[m34] * b.elements[m41];
        out.elements[m32] =
            a.elements[m31] * b.elements[m12] +
            a.elements[m32] * b.elements[m22] +
            a.elements[m33] * b.elements[m32] +
            a.elements[m34] * b.elements[m42];
        out.elements[m33] =
            a.elements[m31] * b.elements[m13] +
            a.elements[m32] * b.elements[m23] +
            a.elements[m33] * b.elements[m33] +
            a.elements[m34] * b.elements[m43];
        out.elements[m34] =
            a.elements[m31] * b.elements[m14] +
            a.elements[m32] * b.elements[m24] +
            a.elements[m33] * b.elements[m34] +
            a.elements[m34] * b.elements[m44];
        out.elements[m41] =
            a.elements[m41] * b.elements[m11] +
            a.elements[m42] * b.elements[m21] +
            a.elements[m43] * b.elements[m31] +
            a.elements[m44] * b.elements[m41];
        out.elements[m42] =
            a.elements[m41] * b.elements[m12] +
            a.elements[m42] * b.elements[m22] +
            a.elements[m43] * b.elements[m32] +
            a.elements[m44] * b.elements[m42];
        out.elements[m43] =
            a.elements[m41] * b.elements[m13] +
            a.elements[m42] * b.elements[m23] +
            a.elements[m43] * b.elements[m33] +
            a.elements[m44] * b.elements[m43];
        out.elements[m44] =
            a.elements[m41] * b.elements[m14] +
            a.elements[m42] * b.elements[m24] +
            a.elements[m43] * b.elements[m34] +
            a.elements[m44] * b.elements[m44];

        return out;
    }

    static makeScale(scale: Vec3, out = new Mat4()) {
        Mat4.identity(out);
        out.elements[m11] = scale.x;
        out.elements[m22] = scale.y;
        out.elements[m33] = scale.z;
        return out;
    }

    static makePerspective(
        left: number,
        right: number,
        top: number,
        bottom: number,
        near: number,
        far: number,
        out = new Mat4()
    ) {
        const x = (2 * near) / (right - left);
        const y = (2 * near) / (top - bottom);

        const a = (right + left) / (right - left);
        const b = (top + bottom) / (top - bottom);

        const c = -(far + near) / (far - near);
        const d = (-2 * far * near) / (far - near);

        out.elements[0] = x;
        out.elements[4] = 0;
        out.elements[8] = a;
        out.elements[12] = 0;
        out.elements[1] = 0;
        out.elements[5] = y;
        out.elements[9] = b;
        out.elements[13] = 0;
        out.elements[2] = 0;
        out.elements[6] = 0;
        out.elements[10] = c;
        out.elements[14] = d;
        out.elements[3] = 0;
        out.elements[7] = 0;
        out.elements[11] = -1;
        out.elements[15] = 0;

        return out;
    }

    static makeLookAt(eye: Vec3, target: Vec3, up: Vec3, out = new Mat4()) {
        //_z.subVectors( eye, target );
        const _z = Vec3.subtract(eye, target);

        //if ( _z.lengthSq() === 0 ) {
        if (Vec3.magnitudeSq(_z) === 0) {
            // eye and target are in the same position
            _z.z = 1;
        }

        _z.normalize();
        //_x.crossVectors( up, _z );
        let _x = Vec3.cross(up, _z);

        //if ( _x.lengthSq() === 0 ) {
        if (Vec3.magnitudeSq(_x) === 0) {
            // up and z are parallel
            if (Math.abs(up.z) === 1) {
                _z.x += 0.0001;
            } else {
                _z.z += 0.0001;
            }

            _z.normalize();
            //_x.crossVectors( up, _z );
            _x = Vec3.cross(up, _z);
        }

        _x.normalize();
        //_y.crossVectors( _z, _x );
        const _y = Vec3.cross(_z, _x);

        out.elements[0] = _x.x;
        out.elements[4] = _y.x;
        out.elements[8] = _z.x;
        out.elements[1] = _x.y;
        out.elements[5] = _y.y;
        out.elements[9] = _z.y;
        out.elements[2] = _x.z;
        out.elements[6] = _y.z;
        out.elements[10] = _z.z;

        return out;
    }
}
