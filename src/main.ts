import "./style.css";

import vertexShaderString from "./shaders/basic.vert?raw";
import fragmentShaderString from "./shaders/basic.frag?raw";
import { createProgram, getAttributeLocation, getUniformLocation } from "./shader";

const testTextureUrl = new URL("/test.jpg", import.meta.url).href;

let gl: WebGL2RenderingContext;
let canvas: HTMLCanvasElement;

const triangleData = new Float32Array([
    // top mid
    0, //x
    1, //y
    1, // r
    0, // g
    0, // b
    0.0, // u
    0.0, // v
    // bottom left
    -1, //x
    -1, //y
    0, //r
    1, //g
    0, //b
    1.0, //u
    0.0, // v
    // bottom right
    1, //x
    -1, //y
    0, //r
    0, //g
    1, //b
    0.5, //u
    1.0, // v
]);

// const shaderurl = new URL("/basic.glsl", import.meta.url).href;
// console.log(`fetching shader from: ${shaderurl}`);
// fetch(shaderurl)
//     .then((response) => response.text())
//     .then((text) => console.log(text));

/**
 * Shows an error in the console and on the screen
 * @param error
 * @returns
 */
function showError(error: string) {
    console.error(error);
    const errorBoxDiv = document.getElementById("errorBox");
    if (!errorBoxDiv) {
        return;
    }

    const textElement = document.createElement("p");
    textElement.innerText = error;
    errorBoxDiv.appendChild(textElement);
}

/**
 * Create VAO
 * @param gl
 * @param buffer
 * @param posAttribute
 * @param colAttribute
 * @returns
 */
function createVertexArrayObject(
    gl: WebGL2RenderingContext,
    buffer: WebGLBuffer,
    posAttribute: number,
    colAttribute: number,
    texCoordAttribute: number
) {
    const vao = gl.createVertexArray();
    if (!vao) {
        throw new Error("Failed to create vertex array object.");
    }
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(posAttribute);
    gl.enableVertexAttribArray(colAttribute);
    gl.enableVertexAttribArray(texCoordAttribute);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    const stride = 7 * Float32Array.BYTES_PER_ELEMENT;

    gl.vertexAttribPointer(posAttribute, 2, gl.FLOAT, false, stride, 0);
    gl.vertexAttribPointer(colAttribute, 3, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.vertexAttribPointer(texCoordAttribute, 2, gl.FLOAT, false, stride, 5 * Float32Array.BYTES_PER_ELEMENT);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null); // unbind to prevent accidental writing

    return vao;
}

const isPowerOf2 = (value: number) => (value & (value - 1)) === 0;

/**
 * Create a texture
 * @param gl
 * @param url
 * @returns
 */
function createTexture(gl: WebGL2RenderingContext, url: string) {
    const texture = gl.createTexture();
    if (!texture) {
        throw new Error("Failed to create texture.");
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

    const image = new Image();
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    image.src = url;

    // unbind to prevent errors
    gl.bindTexture(gl.TEXTURE_2D, null);

    return texture;
}

let prevTimestamp = 0;

let updateId; // used to cancel the animation frame request

function tick(timestamp: number) {
    const elapsedSeconds = (timestamp - prevTimestamp) / 1000;
    prevTimestamp = timestamp;
    //const fps = Math.round(1 / elapsedSeconds);

    updateId = window.requestAnimationFrame(tick);

    render();
}

let texture: WebGLTexture;
let texUniform: WebGLUniformLocation;

function setup() {
    const triangleBuffer = gl.createBuffer();
    if (!triangleBuffer) {
        throw new Error("Failed to create buffer.");
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleData, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    program = createProgram(gl, vertexShaderString, fragmentShaderString);
    const vertexPositionAttributeLocation = getAttributeLocation(gl, program, "vertexPosition");
    const vertexColourAttributeLocation = getAttributeLocation(gl, program, "vertexColour");
    const vertexTextureCoordAttributeLocation = getAttributeLocation(gl, program, "vertexTexCoord");
    vao = createVertexArrayObject(
        gl,
        triangleBuffer,
        vertexPositionAttributeLocation,
        vertexColourAttributeLocation,
        vertexTextureCoordAttributeLocation
    );

    texture = createTexture(gl, testTextureUrl);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    texUniform = getUniformLocation(gl, program, "uSampler");
}

/**
 *
 */
function render() {
    // output merger
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gl.clearColor(0.08, 0.08, 0.08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

    // rasterizer/camera
    gl.viewport(0, 0, canvas.width, canvas.height);

    // vertex shader+fragment shader
    gl.useProgram(program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(texUniform, 0);

    // primitive assembly
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

/**
 * Gets a canvas with the specified ID
 * @param id
 * @returns
 */
function getCanvas(id: string) {
    let c = document.querySelector<HTMLCanvasElement>(id);
    if (!c) {
        throw new Error("Could not create canvas");
    }
    return c;
}

/**
 * Gets a WebGL context from a canvas
 * @param canvas
 * @returns
 */
function getContext(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("webgl2");
    if (!context) {
        throw new Error("Could not create WebGL 2 context.");
    }
    return context;
}

let vao: WebGLVertexArrayObject;
let program: WebGLProgram;
/**
 * Entry point
 */
async function main() {
    canvas = getCanvas("#gameCanvas");
    gl = getContext(canvas);

    setup();
    window.requestAnimationFrame(tick);
}

main().catch((error) => showError(error));
