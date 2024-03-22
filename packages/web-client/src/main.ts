import "./style.css";

import { getCanvasByID, getContextFromCanvas, resizeCanvas } from "./canvas";

let displayWidth = 0;
let displayHeight = 0;

/**
 * Canvas resize handler
 * @param entries
 */
const onResize: ResizeObserverCallback = (entries) => {
    for (const entry of entries) {
        let width;
        let height;
        let dpr = window.devicePixelRatio;
        if (entry.devicePixelContentBoxSize) {
            width = entry.devicePixelContentBoxSize[0].inlineSize;
            height = entry.devicePixelContentBoxSize[0].blockSize;
        } else if (entry.contentBoxSize) {
            if (entry.contentBoxSize[0]) {
                width = entry.contentBoxSize[0].inlineSize;
                height = entry.contentBoxSize[0].blockSize;
            } else {
                // @ts-ignore
                width = entry.contentBoxSize.inlineSize;
                // @ts-ignore
                height = entry.contentBoxSize.blockSize;
            }
        } else {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
        }

        displayWidth = Math.round(width * dpr);
        displayHeight = Math.round(height * dpr);
    }
};

let gl: WebGL2RenderingContext;

let colours = [0, 0, 1];

function render() {
    // resize canvas if required
    resizeCanvas(gl.canvas as HTMLCanvasElement, displayWidth, displayHeight);

    // render
    gl.clearColor(colours[0], colours[1], colours[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

async function main() {
    const canvas = getCanvasByID("#canvas");
    gl = getContextFromCanvas(canvas);

    // resize observer
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas, { box: "content-box" });

    let nextAnimationFrameID = 0;
    let idx = 0;
    let prevIdx = colours.length - 1;

    let prevTimestamp = performance.now();
    const tick = (timestamp: number) => {
        const elapsedSeconds = (timestamp - prevTimestamp) / 1000.0;
        prevTimestamp = timestamp;
        nextAnimationFrameID = window.requestAnimationFrame(tick);

        const cInc = elapsedSeconds * 0.1;

        colours[idx] += cInc;
        colours[prevIdx] -= cInc;

        if (colours[idx] > 1) {
            colours[idx] = 1;
            ++idx;
            prevIdx = idx - 1;
            if (idx >= colours.length) {
                idx = 0;
                prevIdx = colours.length - 1;
            }
        }

        render();
    };

    nextAnimationFrameID = window.requestAnimationFrame(tick);
}

// entry point
main().catch((error) => {
    console.error(error);
});
