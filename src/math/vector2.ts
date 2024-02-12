export interface vec2 {
    x: number;
    y: number;
}

/**
 * Adds vector B to vector A
 * @param a
 * @param b
 * @returns
 */
export function add(a: vec2, b: vec2): vec2 {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

/**
 * Subtracts vector B from vector A
 * @param a
 * @param b
 * @returns
 */
export function subtract(a: vec2, b: vec2): vec2 {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

/**
 * Calculates the magnitude of a vector
 * @param a
 * @returns
 */
export function magnitude(a: vec2): number {
    const length = a.x * a.x + a.y * a.y;
    return Math.sqrt(length);
}

export function normalize(a: vec2): vec2 {
    const m = magnitude(a);
    return {
        x: a.x / m,
        y: a.y / m,
    };
}
