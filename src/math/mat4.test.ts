import { expect, test, describe } from "bun:test";

import { mat4 } from "./mat4";

/**
 * Test converting a matrix into an array
 */
describe("toArray", () => {
    test("basic", () => {
        const m: mat4 = {
            m11: 1,
            m12: 2,
            m13: 3,
            m14: 4,

            m21: 5,
            m22: 6,
            m23: 7,
            m24: 8,

            m31: 9,
            m32: 10,
            m33: 11,
            m34: 12,

            m41: 13,
            m42: 14,
            m43: 15,
            m44: 16,
        };
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        expect(mat4.toArray(m)).toEqual(arr);
    });
});
/**
 * Test converting an array into a matrix
 */
describe("fromArray", () => {
    test("basic", () => {
        const m: mat4 = {
            m11: 1,
            m12: 2,
            m13: 3,
            m14: 4,

            m21: 5,
            m22: 6,
            m23: 7,
            m24: 8,

            m31: 9,
            m32: 10,
            m33: 11,
            m34: 12,

            m41: 13,
            m42: 14,
            m43: 15,
            m44: 16,
        };
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        expect(mat4.fromArray(arr)).toEqual(m);
    });
});
