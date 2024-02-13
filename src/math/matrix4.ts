export interface mat4 {
    m11: number;
    m12: number;
    m13: number;
    m14: number;

    m21: number;
    m22: number;
    m23: number;
    m24: number;

    m31: number;
    m32: number;
    m33: number;
    m34: number;

    m41: number;
    m42: number;
    m43: number;
    m44: number;
}

/**
 * Converts a mat4 into an array
 * @param m
 * @returns
 */
export function toArray(m: mat4) {
    return [m.m11, m.m12, m.m13, m.m14, m.m21, m.m22, m.m23, m.m24, m.m31, m.m32, m.m33, m.m34, m.m41, m.m42, m.m43, m.m44];
}

export function fromArray(a: Array<number>): mat4 {
    if (a.length !== 16) {
        throw new Error(`Expected an array of length 16, got ${a.length}.`);
    }
    return {
        m11: a[0],
        m12: a[1],
        m13: a[2],
        m14: a[3],
        m21: a[4],
        m22: a[5],
        m23: a[6],
        m24: a[7],
        m31: a[8],
        m32: a[9],
        m33: a[10],
        m34: a[11],
        m41: a[12],
        m42: a[13],
        m43: a[14],
        m44: a[15],
    };
}
