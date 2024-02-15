export class Vec3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    static dot(a: Vec3, b: Vec3) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    dot(other: Vec3) {
        return Vec3.dot(this, other);
    }

    static cross(a: Vec3, b: Vec3, out: Vec3 = new Vec3()) {
        const x = a.y * b.z - a.z * b.y;
        const y = a.z * b.x - a.x * b.z;
        const z = a.x * b.y - a.y * b.x;
        return out.set(x, y, z);
    }

    cross(other: Vec3) {
        return Vec3.cross(this, other, this);
    }

    static magnitudeSq(v: Vec3) {
        const length = Vec3.dot(v, v);
        return length;
    }

    static magnitude(v: Vec3) {
        const length = Vec3.dot(v, v);
        return Math.sqrt(length);
    }

    magnitude() {
        return Vec3.magnitude(this);
    }

    static normalize(v: Vec3, out: Vec3 = new Vec3()) {
        const m = Vec3.magnitude(v);
        return out.set(v.x / m, v.y / m, v.z / m);
    }

    normalize() {
        return Vec3.normalize(this);
    }

    static add(a: Vec3, b: Vec3, out: Vec3 = new Vec3()) {
        return out.set(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    add(other: Vec3) {
        return Vec3.add(this, other, this);
    }

    static addScalar(a: Vec3, n: number, out: Vec3 = new Vec3()) {
        return out.set(a.x + n, a.y + n, a.z + n);
    }

    addScalar(n: number) {
        return Vec3.addScalar(this, n, this);
    }

    static subtractScalar(a: Vec3, n: number, out: Vec3 = new Vec3()) {
        return out.set(a.x - n, a.y - n, a.z - n);
    }

    subtractScalar(n: number) {
        return Vec3.subtractScalar(this, n, this);
    }

    static subtract(a: Vec3, b: Vec3, out: Vec3 = new Vec3()) {
        return out.set(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    subtract(other: Vec3) {
        return Vec3.subtract(this, other, this);
    }

    static negate(v: Vec3, out = new Vec3()) {
        return out.set(-v.x, -v.y, -v.z);
    }

    negate() {
        return Vec3.negate(this);
    }
}
