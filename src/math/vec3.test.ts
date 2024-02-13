import { expect, test, describe } from "bun:test";

import { vec3 } from "./vec3";

/**
 * Test adding vec3
 */
describe("add", () => {
    test("zero vectors", () => {
        const a: vec3 = { x: 0, y: 0, z: 0 };
        const b: vec3 = { x: 0, y: 0, z: 0 };
        expect(vec3.add(a, b)).toEqual({ x: 0, y: 0, z: 0 });
    });
    test("add", () => {
        const a: vec3 = { x: 1, y: 3, z: -1 };
        const b: vec3 = { x: -2, y: 1, z: 6 };
        expect(vec3.add(a, b)).toEqual({ x: -1, y: 4, z: 5 });
        expect(vec3.add(a, b)).toEqual({ x: -1, y: 4, z: 5 });
    });
    test("ensure immutable", () => {
        const a: vec3 = { x: 1, y: 3, z: -1 };
        const b: vec3 = { x: -2, y: 1, z: 6 };

        const c = vec3.add(a, b);

        expect(a).toEqual({ x: 1, y: 3, z: -1 });
        expect(b).toEqual({ x: -2, y: 1, z: 6 });
    });
});

/**
 * Test subtracting vec3
 */
describe("subtract", () => {
    test("zero vectors", () => {
        const a: vec3 = { x: 0, y: 0, z: 0 };
        const b: vec3 = { x: 0, y: 0, z: 0 };
        expect(vec3.subtract(a, b)).toEqual({ x: 0, y: 0, z: 0 });
    });
    test("subtract", () => {
        const a: vec3 = { x: 1, y: 3, z: -1 };
        const b: vec3 = { x: -2, y: 1, z: 6 };
        expect(vec3.subtract(a, b)).toEqual({ x: 3, y: 2, z: -7 });
        expect(vec3.subtract(b, a)).toEqual({ x: -3, y: -2, z: 7 });
    });
});

/**
 * Test calculating magnitude of a vec3
 */
describe("magnitude", () => {
    test("zero vector", () => {
        const a: vec3 = { x: 0, y: 0, z: 0 };
        expect(vec3.magnitude(a)).toEqual(0);
    });
    test("magnitude", () => {
        const a: vec3 = { x: 3, y: 2, z: -1 };
        expect(vec3.magnitude(a)).toEqual(3.7416573867739413);
    });
});

/**
 * Test normalizing a vec3
 */
describe("normalize", () => {
    test("zero vector", () => {
        const a: vec3 = { x: 0, y: 0, z: 0 };
        // todo: decide how to handle this, whether return a zero vecotor or throw exception
    });
    test("normalize", () => {
        const a: vec3 = { x: 3, y: 2, z: -1 };
        expect(vec3.normalize(a)).toEqual({ x: 0.8017837257372732, y: 0.5345224838248488, z: -0.2672612419124244 });
    });
});

/**
 * Test converting vector to an array
 */
describe("toArray", () => {
    test("basic", () => {
        const a: vec3 = { x: 3, y: 2, z: -1 };
        const arr = [3, 2, -1];
        expect(vec3.toArray(a)).toEqual(arr);
    });
});

/**
 * Test converting vector to an array
 */
describe("fromArray", () => {
    test("basic", () => {
        const arr = [3, 2, -1];
        const a: vec3 = { x: 3, y: 2, z: -1 };
        expect(vec3.fromArray(arr)).toEqual(a);
    });
});

describe("dot", () => {
    test("basic", () => {
        const a = vec3.from(1, 2, 3);
        const b = vec3.from(3, 4, 5);

        const dot = vec3.dot(a, b);

        expect(dot).toEqual(26);
    });
    test("zero", () => {
        const a = vec3.from(0, 0, 0);
        const b = vec3.from(3, 4, 5);

        const dot = vec3.dot(a, b);

        expect(dot).toEqual(0);
    });
});

describe("cross", () => {
    test("basic", () => {
        const a = vec3.from(1, 2, 3);
        const b = vec3.from(3, 4, 5);

        const c = vec3.cross(a, b);

        expect(c.x).toEqual(-2);
        expect(c.y).toEqual(4);
        expect(c.z).toEqual(-2);
    });
});
