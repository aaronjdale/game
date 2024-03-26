import "./style.css";
import basicVertShaderSource from "./shaders/basic.vert?raw";
import basicFragShaderSource from "./shaders/basic.frag?raw";
import { getCanvasByID, getContextFromCanvas, resizeCanvas } from "./canvas";
import { createProgram, createShader } from "./shader";

let displayWidth = 0;
let displayHeight = 0;

// const getRemoteText = (url: string) => fetch(url).then((r) => r.text());

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

let program: WebGLProgram;
let vao: WebGLVertexArrayObject;

function render() {
    // resize canvas if required
    resizeCanvas(gl.canvas as HTMLCanvasElement, displayWidth, displayHeight);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // render
    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // unbind to make sure no unintended modifications
    gl.bindVertexArray(null);
    gl.useProgram(null);
}

async function main() {
    const canvas = getCanvasByID("#canvas");
    gl = getContextFromCanvas(canvas);

    // resize observer
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas, { box: "content-box" });

    // create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, basicVertShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, basicFragShaderSource);
    program = createProgram(gl, vertexShader, fragmentShader);

    const posAttrLoc = gl.getAttribLocation(program, "a_position");

    // create vertex buffer
    const posBuffer = gl.createBuffer();
    if (!posBuffer) {
        throw new Error(`Failed to create buffer`);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

    const positions = [0, 0, 0, 0.5, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // create vertex array object
    const v = gl.createVertexArray();
    if (!v) {
        throw new Error(`Failed to create vertex array object`);
    }
    vao = v;
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(posAttrLoc);
    gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    // start game loop
    let nextAnimationFrameID = 0;
    let prevTimestamp = performance.now();
    const tick = (timestamp: number) => {
        // @ts-ignore
        const elapsedSeconds = (timestamp - prevTimestamp) / 1000.0;
        prevTimestamp = timestamp;
        nextAnimationFrameID = window.requestAnimationFrame(tick);

        render();
    };

    nextAnimationFrameID = window.requestAnimationFrame(tick);
}

// entry point
main().catch((error) => {
    console.error(error);
});
