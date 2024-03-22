import { getCanvasByID, getContextFromCanvas } from "./canvas";
import "./style.css";

async function main() {
    const canvas = getCanvasByID("#canvas");
    const gl = getContextFromCanvas(canvas);

    const canvasToDisplaySizeMap = new Map([[canvas, [300, 150]]]);

    gl.clearColor(255, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

// entry point
main().catch((error) => {
    console.error(error);
});
