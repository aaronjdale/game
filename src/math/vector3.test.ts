import { expect, test, describe } from "bun:test";

import { vec3, add, subtract, magnitude, normalize, toArray } from "./vector3";

/**
 * Test adding vec3
 */
describe("add", () => {
    test("zero vectors", () => {
        const a: vec3 = { x: 0, y: 0, z: 0 };
        const b: vec3 = { x: 0, y: 0, z: 0 };
        expect(add(a, b)).toEqual({ x: 0, y: 0, z: 0 });
    });
    test("add", () => {
        const a: vec3 = { x: 1, y: 3, z: -1 };
        const b: vec3 = { x: -2, y: 1, z: 6 };
        expect(add(a, b)).toEqual({ x: -1, y: 4, z: 5 });
        expect(add(a, b)).toEqual({ x: -1, y: 4, z: 5 });
    });
    test("ensure immutable", () => {
        const a: vec3 = { x: 1, y: 3, z: -1 };
        const b: vec3 = { x: -2, y: 1, z: 6 };

        const c = add(a, b);

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
        expect(subtract(a, b)).toEqual({ x: 0, y: 0, z: 0 });
    });
    test("subtract", () => {
        const a: vec3 = { x: 1, y: 3, z: -1 };
        const b: vec3 = { x: -2, y: 1, z: 6 };
        expect(subtract(a, b)).toEqual({ x: 3, y: 2, z: -7 });
        expect(subtract(b, a)).toEqual({ x: -3, y: -2, z: 7 });
    });
});

/**
 * Test calculating magnitude of a vec3
 */
describe("magnitude", () => {
    test("zero vector", () => {
        const a: vec3 = { x: 0, y: 0, z: 0 };
        expect(magnitude(a)).toEqual(0);
    });
    test("magnitude", () => {
        const a: vec3 = { x: 3, y: 2, z: -1 };
        expect(magnitude(a)).toEqual(3.7416573867739413);
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
        expect(normalize(a)).toEqual({ x: 0.8017837257372732, y: 0.5345224838248488, z: -0.2672612419124244 });
    });
});

/**
 * Test converting vector to an array
 */
describe("toArray", () => {
    test("basic", () => {
        const a: vec3 = { x: 3, y: 2, z: -1 };
        expect(toArray(a)).toEqual([a.x, a.y, a.z]);
    });
});
