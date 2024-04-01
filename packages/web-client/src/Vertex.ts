import { Vec2 } from "math/Vec2";
import { Vec3 } from "math/Vec3";

export class Vertex {
    position: Vec3 = new Vec3();
    normal: Vec3 = new Vec3();
    texCoord: Vec2 = new Vec2();

    constructor() {}
}
