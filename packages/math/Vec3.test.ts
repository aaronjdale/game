import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { Vec3 } from "./Vec3";

const a = new Vec3(6, -2, 4);
const b = new Vec3(-1, 7, 2);

describe("Vector3", () => {
    /**
     * Testing addition
     */
    describe("add", () => {
        test("basic", () => {
            const c = Vec3.add(a, b);
            expect(c.x).toEqual(5.0);
            expect(c.y).toEqual(5.0);
            expect(c.z).toEqual(6.0);
        });
    });
    /**
     * Testing subtraction
     */
    describe("subtract", () => {
        test("basic", () => {
            const c = Vec3.subtract(a, b);

            expect(c.x).toEqual(7.0);
            expect(c.y).toEqual(-9.0);
            expect(c.z).toEqual(2.0);
        });
    });

    /**
     * Testing the computation of a vector's length
     */
    describe("length", () => {
        test("basic", () => {
            const x = Vec3.length(a);
            expect(x).toBeCloseTo(7.4833);

            const y = Vec3.length(b);
            expect(y).toBeCloseTo(7.3484);
        });
    });

    /**
     * Testing normalizing a vector
     */
    describe("normalize", () => {
        test("basic", () => {
            const c = Vec3.normalize(a);
            expect(c.x).toBeCloseTo(0.801784);
            expect(c.y).toBeCloseTo(-0.267261);
            expect(c.z).toBeCloseTo(0.534522);

            const d = Vec3.normalize(b);
            expect(d.x).toBeCloseTo(-0.136083);
            expect(d.y).toBeCloseTo(0.952579);
            expect(d.z).toBeCloseTo(0.272166);
        });
    });

    /**
     * Testing cross product
     */
    describe("cross", () => {
        test("basic", () => {
            const c = Vec3.cross(a, b);

            expect(c.x).toEqual(-32);
            expect(c.y).toEqual(-16);
            expect(c.z).toEqual(40);
        });
    });
});
