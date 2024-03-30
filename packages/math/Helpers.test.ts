import { describe, test, expect } from "bun:test";
import { degreesToRadians, radiansToDegrees } from "./Helpers";

describe("Helpers", () => {
    describe("degreesToRadians", () => {
        test("basic", () => {
            const res = degreesToRadians(1);
            expect(res).toBeCloseTo(0.017453);
        });
        test("zero", () => {
            const res = degreesToRadians(0);
            expect(res).toEqual(0);
        });
    });

    describe("radiansToDegrees", () => {
        test("basic", () => {
            const res = radiansToDegrees(1);
            expect(res).toBeCloseTo(57.29578);
        });
        test("zero", () => {
            const res = radiansToDegrees(0);
            expect(res).toEqual(0);
        });
    });
});
