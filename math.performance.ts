import { Vec3 } from "./src/math/Vec3";
import { Mat4 } from "./src/math/Mat4";

function benchmark(name: string, func: any, runs: number = 1_000_000) {
    let sum = 0;
    for (let i = 0; i < runs; ++i) {
        const start = performance.now();

        func();

        const end = performance.now();
        sum += end - start;
    }
    console.log(`${name}: total: ${sum} ms,  avg: ${sum / runs} ms`);
}

async function main() {
    benchmark("Mat4.transpose", () => {
        const a = new Mat4();

        const out = a.transpose();
    });
    benchmark("Mat4.multiply", () => {
        const a = new Mat4().fromArray([1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4, 4, 3, 2, 1]);
        const b = new Mat4().fromArray([5, 6, 7, 8, 8, 7, 6, 5, 5, 6, 7, 8, 8, 7, 6, 5]);

        const c = a.multiply(b);
    });
}

main().catch((error) => console.log(error));
