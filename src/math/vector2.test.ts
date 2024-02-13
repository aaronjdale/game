import { expect, test, describe } from "bun:test";

import { vec2, add, subtract, magnitude, normalize, toArray } from "./vector2";

/**
 * Test adding vec2
 */
describe("add", () => {
    test("zero vectors", () => {
        const a: vec2 = { x: 0, y: 0 };
        const b: vec2 = { x: 0, y: 0 };
        expect(add(a, b)).toEqual({ x: 0, y: 0 });
    });
    test("add", () => {
        const a: vec2 = { x: 1, y: 3 };
        const b: vec2 = { x: -2, y: 1 };
        expect(add(a, b)).toEqual({ x: -1, y: 4 });
        expect(add(a, b)).toEqual({ x: -1, y: 4 });
    });
});

/**
 * Test subtracting vec2
 */
describe("subtract", () => {
    test("zero vectors", () => {
        const a: vec2 = { x: 0, y: 0 };
        const b: vec2 = { x: 0, y: 0 };
        expect(subtract(a, b)).toEqual({ x: 0, y: 0 });
    });
    test("subtract", () => {
        const a: vec2 = { x: 1, y: 3 };
        const b: vec2 = { x: -2, y: 1 };
        expect(subtract(a, b)).toEqual({ x: 3, y: 2 });
        expect(subtract(b, a)).toEqual({ x: -3, y: -2 });
    });
});

/**
 * Test calculating magnitude of vec2
 */
describe("magnitude", () => {
    test("zero vector", () => {
        const a: vec2 = { x: 0, y: 0 };
        expect(magnitude(a)).toEqual(0);
    });
    test("magnitude", () => {
        const a: vec2 = { x: 3, y: 2 };
        expect(magnitude(a)).toEqual(3.605551275463989);
    });
});

/**
 * Test normalizing vec2
 */
describe("normalize", () => {
    test("zero vector", () => {
        const a: vec2 = { x: 0, y: 0 };
        // todo: decide how to handle this, whether return a zero vecotor or throw exception
    });
    test("normalize", () => {
        const a: vec2 = { x: 3, y: 2 };
        expect(normalize(a)).toEqual({ x: 0.8320502943378437, y: 0.5547001962252291 });
    });
});

/**
 * Test converting vector to an array
 */
describe("toArray", () => {
    test("basic", () => {
        const a: vec2 = { x: 3, y: 2 };
        expect(toArray(a)).toEqual([a.x, a.y]);
    });
});
