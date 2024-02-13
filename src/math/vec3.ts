export interface vec3 {
    x: number;
    y: number;
    z: number;
}

export namespace vec3 {
    export function from(x: number, y: number, z: number) {
        return {
            x,
            y,
            z,
        };
    }

    /**
     * Adds vector B to vector A
     * @param a
     * @param b
     * @returns
     */
    export function add(a: vec3, b: vec3): vec3 {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z,
        };
    }

    /**
     * Adds a scalar value to each component of a vector
     * @param a
     * @param n
     * @returns
     */
    export function addScalar(a: vec3, n: number) {
        return {
            x: a.x + n,
            y: a.y + n,
            z: a.z + n,
        };
    }

    /**
     * Subtracts vector B from vector A
     * @param a
     * @param b
     * @returns
     */
    export function subtract(a: vec3, b: vec3): vec3 {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z,
        };
    }

    /**
     * Subtracts a scalar value from all components of a vector
     * @param a
     * @param n
     * @returns
     */
    export function subtractScalar(a: vec3, n: number): vec3 {
        return {
            x: a.x - n,
            y: a.y - n,
            z: a.z - n,
        };
    }

    /**
     * Calculates the magnitude of a vector
     * @param a
     * @returns
     */
    export function magnitude(a: vec3): number {
        const length = a.x * a.x + a.y * a.y + a.z * a.z;
        return Math.sqrt(length);
    }

    /**
     * Normalize a vector
     * @param a
     * @returns
     */
    export function normalize(a: vec3): vec3 {
        const m = magnitude(a);
        return {
            x: a.x / m,
            y: a.y / m,
            z: a.z / m,
        };
    }

    /**
     * Calculate the dot product of two vectors
     * @param a
     * @param b
     */
    export function dot(a: vec3, b: vec3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    /**
     * Calcuate the cross product of two vectors
     * @param a
     * @param b
     */
    export function cross(a: vec3, b: vec3): vec3 {
        const x = a.y * b.z - a.z * b.y;
        const y = a.z * b.x - a.x * b.z;
        const z = a.x * b.y - a.y * b.x;
        return { x, y, z };
    }

    /**
     * Converts to array
     * @param v
     * @returns
     */
    export function toArray(v: vec3) {
        return [v.x, v.y, v.z];
    }

    /**
     * Converts an array into a vec3 object
     * @param arr
     * @returns
     */
    export function fromArray(arr: Array<number>): vec3 {
        if (arr.length !== 3) {
            throw new Error(`Expected an array of length 3, got: ${arr.length}`);
        }
        return { x: arr[0], y: arr[1], z: arr[2] };
    }
}
