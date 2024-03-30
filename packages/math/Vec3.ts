export class Vec3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    /**
     * Creates new Vec3
     * @param x
     * @param y
     * @param z
     */
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Sets the values of the vector
     * @param x
     * @param y
     * @param z
     * @returns
     */
    set(x: number = 0, y: number, z: number): Vec3 {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     *
     * @param a
     * @param b
     * @returns
     */
    static add(a: Vec3, b: Vec3, out: Vec3 = new Vec3()): Vec3 {
        const x = a.x + b.x;
        const y = a.y + b.y;
        const z = a.z + b.z;
        return out.set(x, y, z);
    }

    /**
     *
     * @param a
     * @param b
     * @returns
     */
    static subtract(a: Vec3, b: Vec3, out: Vec3 = new Vec3()): Vec3 {
        const x = a.x - b.x;
        const y = a.y - b.y;
        const z = a.z - b.z;
        return out.set(x, y, z);
    }

    /**
     *
     * @param v
     * @returns
     */
    static length(v: Vec3): number {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    /**
     *
     * @param a
     * @param out
     * @returns
     */
    static normalize(a: Vec3, out: Vec3 = new Vec3()): Vec3 {
        const length = Vec3.length(a);

        // make sure we don't divide by 0.
        if (length > 0.00001) {
            const x = a.x / length;
            const y = a.y / length;
            const z = a.z / length;
            return out.set(x, y, z);
        } else {
            return out.set(0, 0, 0);
        }
    }

    /**
     *
     * @param a
     * @param b
     * @returns
     */
    static cross(a: Vec3, b: Vec3, out: Vec3 = new Vec3()): Vec3 {
        const x = a.y * b.z - a.z * b.y;
        const y = a.z * b.x - a.x * b.z;
        const z = a.x * b.y - a.y * b.x;
        return out.set(x, y, z);
    }
}
