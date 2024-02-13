export interface vec3 {
    x: number;
    y: number;
    z: number;
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
 * Calculates the magnitude of a vector
 * @param a
 * @returns
 */
export function magnitude(a: vec3): number {
    const length = a.x * a.x + a.y * a.y + a.z * a.z;
    return Math.sqrt(length);
}

export function normalize(a: vec3): vec3 {
    const m = magnitude(a);
    return {
        x: a.x / m,
        y: a.y / m,
        z: a.z / m,
    };
}

export function toArray(v: vec3) {
    return [v.x, v.y, v.z];
}
