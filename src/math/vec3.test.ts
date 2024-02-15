import { describe, test, expect } from "bun:test";
import { Vec3 } from "./vec3";

describe("magnitude", () => {
    test("zero vector", () => {
        const a = new Vec3(0, 0, 0);
        expect(Vec3.magnitude(a)).toEqual(0);
    });
    test("magnitude", () => {
        const a = new Vec3(3, 2, -1);
        expect(Vec3.magnitude(a)).toEqual(3.7416573867739413);
    });
});

describe("normalize", () => {
    test("zero vector", () => {
        //const a = new Vec3(0, 0, 0);
        // todo: decide how to handle this, whether return a zero vecotor or throw exception
    });
    test("normalize", () => {
        const a = new Vec3(3, 2, -1);
        const res = new Vec3(0.8017837257372732, 0.5345224838248488, -0.2672612419124244);
        expect(Vec3.normalize(a)).toEqual(res);
    });
});

describe("dot", () => {
    test("basic", () => {
        const a = new Vec3(1, 2, 3);
        const b = new Vec3(3, 4, 5);

        expect(Vec3.dot(a, b)).toEqual(26);
        expect(a.dot(b)).toEqual(26);
    });
    test("zero", () => {
        const a = new Vec3(0, 0, 0);
        const b = new Vec3(3, 4, 5);

        const dot = Vec3.dot(a, b);

        expect(dot).toEqual(0);
    });
});

describe("cross", () => {
    test("basic", () => {
        const a = new Vec3(1, 2, 3);
        const b = new Vec3(3, 4, 5);

        const c = Vec3.cross(a, b);

        expect(c.x).toEqual(-2);
        expect(c.y).toEqual(4);
        expect(c.z).toEqual(-2);
    });
});
