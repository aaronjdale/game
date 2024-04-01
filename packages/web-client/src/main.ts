import "./style.css";
import basicVertShaderSource from "./shaders/basic.vert?raw";
import basicFragShaderSource from "./shaders/basic.frag?raw";

import { getCanvasByID, getContextFromCanvas, resizeCanvas } from "./canvas";
import { createProgram, createShader, deleteShader } from "./shader";
import { Colours } from "./Colour4";
import { positions, colours } from "./vao_data";

import { Mat4 } from "math/Mat4";
import { Vec3 } from "math/Vec3";
import { degreesToRadians } from "math/Helpers";
import { getRemoteText } from "./helper";
import { parseObj, vertex } from "./obj";

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

let angle = 0;

let gl: WebGL2RenderingContext;

let program: WebGLProgram;

let projectionMatrixUniform: WebGLUniformLocation;
let worldMatrixUniform: WebGLUniformLocation;
let viewMatrixUniform: WebGLUniformLocation;

let cameraPosition: Vec3 = new Vec3(1000, 100, 1000);
let cameraTarget: Vec3 = new Vec3(0, 0, 0);

let vao: WebGLVertexArrayObject;

let matWorld = new Mat4();
let matProj = new Mat4();
let matView = new Mat4();

const getUniformLocation = (program: WebGLProgram, uniform: string) => {
    let u = gl.getUniformLocation(program, uniform);
    if (!u) {
        throw new Error(`Failed to get uniform location: ${uniform}`);
    }
    return u;
};

function createVertexArray(data: vertex[], posAttrLoc: number, colAttrLoc: number) {
    let v = gl.createVertexArray();
    if (!v) {
        throw new Error(`Failed to create vertex array`);
    }

    gl.bindVertexArray(v);

    // create position buffer
    let dataBuffer = gl.createBuffer();
    if (!dataBuffer) {
        throw new Error(`Failed to create buffer`);
    }

    const d = data
        .map((v) => {
            return [v.x, v.y, v.z, v.u, v.v, v.nx, v.ny, v.nz];
        })
        .flat();

    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(d), gl.STATIC_DRAW);

    // position
    gl.enableVertexAttribArray(posAttrLoc);
    let offset = 0;
    const stride = 3 + 2 + 3;
    gl.vertexAttribPointer(
        posAttrLoc,
        3,
        gl.FLOAT,
        false,
        stride * Float32Array.BYTES_PER_ELEMENT,
        offset * Float32Array.BYTES_PER_ELEMENT
    );

    // colour
    gl.enableVertexAttribArray(colAttrLoc);
    offset = 5;
    gl.vertexAttribPointer(
        colAttrLoc,
        3,
        gl.FLOAT,
        true,
        stride * Float32Array.BYTES_PER_ELEMENT,
        offset * Float32Array.BYTES_PER_ELEMENT
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);

    return v;
}

/**
 *
 * @param posAttrLoc
 * @param positions
 * @param colAttrLoc
 * @param colours
 * @returns
 */
function createVertexArrayWithData(
    posAttrLoc: number,
    positions: number[],
    colAttrLoc: number | undefined = undefined,
    colours: number[] = []
) {
    let v = gl.createVertexArray();
    if (!v) {
        throw new Error(`Failed to create vertex array`);
    }

    gl.bindVertexArray(v);

    // create position buffer
    let positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
        throw new Error(`Failed to create buffer`);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(posAttrLoc);
    const offset = 0;
    const stride = 0;
    gl.vertexAttribPointer(
        posAttrLoc,
        3,
        gl.FLOAT,
        false,
        stride * Float32Array.BYTES_PER_ELEMENT,
        offset * Float32Array.BYTES_PER_ELEMENT
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    if (colAttrLoc) {
        // create colours buffer
        let colourBuffer = gl.createBuffer();
        if (!colourBuffer) {
            throw new Error(`Failed to create buffer`);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colours), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(colAttrLoc);
        const offset = 0;
        const stride = 0;
        gl.vertexAttribPointer(
            colAttrLoc,
            3,
            gl.UNSIGNED_BYTE,
            true,
            stride * Uint8Array.BYTES_PER_ELEMENT,
            offset * Uint8Array.BYTES_PER_ELEMENT
        );
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    gl.bindVertexArray(null);

    return v;
}

let squareVao: WebGLVertexArrayObject;

/**
 *
 */
function setup() {
    // create shader program
    let vert = createShader(gl, gl.VERTEX_SHADER, basicVertShaderSource);
    let frag = createShader(gl, gl.FRAGMENT_SHADER, basicFragShaderSource);
    program = createProgram(gl, vert, frag);
    deleteShader(gl, vert);
    deleteShader(gl, frag);

    let posAttrLoc = gl.getAttribLocation(program, "a_position");
    let colAttrLoc = gl.getAttribLocation(program, "a_color");

    worldMatrixUniform = getUniformLocation(program, "u_world");
    projectionMatrixUniform = getUniformLocation(program, "u_projection");
    viewMatrixUniform = getUniformLocation(program, "u_view");

    // read cube obj
    getRemoteText(`/untitled.obj`).then((text) => {
        const vertices = parseObj(text);
        squareVao = createVertexArray(vertices, posAttrLoc, colAttrLoc);
    });

    vao = createVertexArrayWithData(posAttrLoc, positions, colAttrLoc, colours);
}

/**
 *
 * @param elapsedSeconds
 */
function render(elapsedSeconds: number) {
    // resize if needed
    resizeCanvas(gl.canvas as HTMLCanvasElement, displayWidth, displayHeight);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // compute change
    angle += elapsedSeconds * 2;

    // view
    Mat4.identity(matView);
    let cameraMatrix = Mat4.identity();
    cameraMatrix = Mat4.lookAt(cameraPosition, cameraTarget, new Vec3(0, 1, 0));

    matView = Mat4.inverse(cameraMatrix);

    // projection
    Mat4.identity(matProj);
    const aspect = gl.canvas.width / gl.canvas.height;
    matProj = Mat4.perspective(degreesToRadians(75), aspect, 0.1, 2000);

    Mat4.identity(matWorld);
    matWorld = Mat4.translation(new Vec3(0, 0, 0));
    matWorld = Mat4.multiply(matWorld, Mat4.rotationX(degreesToRadians(180)));

    // clear canvas
    gl.clearColor(Colours.CornflowerBlue.r, Colours.CornflowerBlue.g, Colours.CornflowerBlue.b, Colours.CornflowerBlue.a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // set state
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // set shader
    gl.useProgram(program);
    gl.uniformMatrix4fv(worldMatrixUniform, false, matWorld.values);
    gl.uniformMatrix4fv(projectionMatrixUniform, false, matProj.values);
    gl.uniformMatrix4fv(viewMatrixUniform, false, matView.values);

    // set vao
    gl.bindVertexArray(vao);

    const floats_per_vertex = 3;
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / floats_per_vertex);

    gl.bindVertexArray(squareVao);

    Mat4.identity(matWorld);
    matWorld = Mat4.scaling(50);

    gl.uniformMatrix4fv(worldMatrixUniform, false, matWorld.values);
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);

    // unset vao
    gl.bindVertexArray(null);

    // unset shader
    gl.useProgram(null);
}

async function main() {
    console.log("start");
    const canvas = getCanvasByID("#canvas");
    gl = getContextFromCanvas(canvas);

    // resize observer
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas, { box: "content-box" });

    canvas.addEventListener("mouseup", (event: MouseEvent) => {
        console.log(event);
    });
    canvas.addEventListener("mousedown", (event: MouseEvent) => {});
    canvas.addEventListener("wheel", (event: WheelEvent) => {
        cameraPosition.x += event.deltaY * 0.1;
        cameraPosition.z += event.deltaY * 0.1;
    });

    setup();

    // start game loop
    // @ts-ignore
    let nextAnimationFrameID = 0;
    let prevTimestamp = performance.now();
    const tick = (timestamp: number) => {
        const elapsedSeconds = (timestamp - prevTimestamp) * 0.001;
        prevTimestamp = timestamp;
        nextAnimationFrameID = window.requestAnimationFrame(tick);
        render(elapsedSeconds);
    };

    nextAnimationFrameID = window.requestAnimationFrame(tick);
}

// entry point
main().catch((error) => {
    console.error(error);
});
