export class Vec2 {
    x: number = 0;
    y: number = 0;

    /**
     * Creates new Vec3
     * @param x
     * @param y
     */
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the values of the vector
     * @param x
     * @param y
     * @returns
     */
    set(x: number = 0, y: number): Vec2 {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     *
     * @param a
     * @param b
     * @returns
     */
    static add(a: Vec2, b: Vec2, out: Vec2 = new Vec2()): Vec2 {
        const x = a.x + b.x;
        const y = a.y + b.y;
        return out.set(x, y);
    }

    /**
     *
     * @param a
     * @param b
     * @returns
     */
    static subtract(a: Vec2, b: Vec2, out: Vec2 = new Vec2()): Vec2 {
        const x = a.x - b.x;
        const y = a.y - b.y;
        return out.set(x, y);
    }

    /**
     *
     * @param v
     * @returns
     */
    static length(v: Vec2): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    /**
     *
     * @param a
     * @param out
     * @returns
     */
    static normalize(a: Vec2, out: Vec2 = new Vec2()): Vec2 {
        const length = Vec2.length(a);

        // make sure we don't divide by 0.
        if (length > 0.00001) {
            const x = a.x / length;
            const y = a.y / length;
            return out.set(x, y);
        } else {
            return out.set(0, 0);
        }
    }
}
