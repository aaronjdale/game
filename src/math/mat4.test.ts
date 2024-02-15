import { describe, test, expect } from "bun:test";
import { Mat4 } from "./Mat4";

describe("rowColToIndex", () => {
    test("basic", () => {
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

        expect(Mat4.rowColToIndex(0, 0)).toEqual(m11);
        expect(Mat4.rowColToIndex(0, 1)).toEqual(m12);
        expect(Mat4.rowColToIndex(0, 2)).toEqual(m13);
        expect(Mat4.rowColToIndex(0, 3)).toEqual(m14);
        expect(Mat4.rowColToIndex(1, 0)).toEqual(m21);
        expect(Mat4.rowColToIndex(1, 1)).toEqual(m22);
        expect(Mat4.rowColToIndex(1, 2)).toEqual(m23);
        expect(Mat4.rowColToIndex(1, 3)).toEqual(m24);
        expect(Mat4.rowColToIndex(2, 0)).toEqual(m31);
        expect(Mat4.rowColToIndex(2, 1)).toEqual(m32);
        expect(Mat4.rowColToIndex(2, 2)).toEqual(m33);
        expect(Mat4.rowColToIndex(2, 3)).toEqual(m34);
        expect(Mat4.rowColToIndex(3, 0)).toEqual(m41);
        expect(Mat4.rowColToIndex(3, 1)).toEqual(m42);
        expect(Mat4.rowColToIndex(3, 2)).toEqual(m43);
        expect(Mat4.rowColToIndex(3, 3)).toEqual(m44);
    });
});

describe("multiply", () => {
    test("basic", () => {
        const a = new Mat4().fromArray([1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4, 4, 3, 2, 1]);
        const b = new Mat4().fromArray([5, 6, 7, 8, 8, 7, 6, 5, 5, 6, 7, 8, 8, 7, 6, 5]);
        const result = new Mat4().fromArray([68, 66, 64, 62, 62, 64, 66, 68, 68, 66, 64, 62, 62, 64, 66, 68]);

        expect(Mat4.multiply(a, b)).toEqual(result);
    });
});
