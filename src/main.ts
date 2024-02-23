import "./style.css";
import basicVertexShaderSource from "./shaders/basic.vert?raw";
import basicFragmentShaderSource from "./shaders/basic.frag?raw";

import * as ShaderUtils from "./graphics/ShaderUtils";
import * as BufferUtils from "./graphics/BufferUtils";
import { letterGeometry } from "./graphics/PresetData";
import { getCanvas, getContextFromCanvas, resizeCanvas } from "./canvas";
import { m4 } from "./math/Matrix4";

const testTextureUrl = new URL("/test.jpg", import.meta.url).href;

let gl: WebGL2RenderingContext;
let program: WebGLShader;

let world = [1, 0, 0, 0, 1, 0, 0, 0, 1];
let view = m4.identity();
let projection = m4.identity();

let radians = 0;

let worldMatrixUniformLoc: WebGLUniformLocation;
let projectionMatrixUniformLoc: WebGLUniformLocation;
let viewMatrixUniformLoc: WebGLUniformLocation;
let samplerUniformLoc: WebGLUniformLocation;

let positionAttribLoc: number;
let colourAttribLoc: number;
let uvAttribLoc: number;
let buffer: WebGLBuffer;

const isPowerOf2 = (value: number) => (value & (value - 1)) === 0;

function createTexture(url: string) {
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

let texture: WebGLTexture;

/**
 *
 */
function setup() {
    // create shader program
    program = ShaderUtils.createProgram(gl, basicVertexShaderSource, basicFragmentShaderSource);

    texture = createTexture(testTextureUrl);

    // set clear colour
    gl.clearColor(0.05, 0.05, 0.05, 1.0);

    // get attribute locations
    positionAttribLoc = ShaderUtils.getAttributeLocation(gl, program, "a_position");
    colourAttribLoc = ShaderUtils.getAttributeLocation(gl, program, "a_colour");
    uvAttribLoc = ShaderUtils.getAttributeLocation(gl, program, "a_texCoord");

    // get uniform locations
    worldMatrixUniformLoc = ShaderUtils.getUniformLocation(gl, program, "u_worldMatrix");
    projectionMatrixUniformLoc = ShaderUtils.getUniformLocation(gl, program, "u_projectionMatrix");
    viewMatrixUniformLoc = ShaderUtils.getUniformLocation(gl, program, "u_viewMatrix");

    samplerUniformLoc = ShaderUtils.getUniformLocation(gl, program, "u_texture");

    // create buffer and set data
    buffer = BufferUtils.createBuffer(gl);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, letterGeometry, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // compute the projection matrix
    projection = m4.perspective((75 * Math.PI) / 180.0, gl.canvas.width / gl.canvas.height, 1, 2000);
}

/**
 *
 */
function render() {
    resizeCanvas(gl.canvas as HTMLCanvasElement);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // clear frame
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program);

    // set projection matrix
    gl.uniformMatrix4fv(projectionMatrixUniformLoc, false, projection);

    const cameraPos = [
        Math.sin(radians) * 600, //x
        200, //y
        Math.cos(radians) * 600, //z
    ];

    const up = [0, 1, 0];
    const target = [0, 0, 0];

    view = m4.lookAt(cameraPos, target, up);
    view = m4.inverse(view);
    gl.uniformMatrix4fv(viewMatrixUniformLoc, false, view);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(samplerUniformLoc, 0);

    // compute and set world matrix
    let numF = 6;
    for (let i = 0; i < numF; ++i) {
        let angle = (i * Math.PI * 2) / numF;
        let radius = 400;

        world = m4.identity();
        world = m4.translate(world, 0, 0, -300);
        world = m4.translate(world, Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        gl.uniformMatrix4fv(worldMatrixUniformLoc, false, world);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        const type = gl.FLOAT;
        const normalize = false;
        const stride = 3 + 4 + 2;

        gl.enableVertexAttribArray(positionAttribLoc);
        gl.vertexAttribPointer(positionAttribLoc, 3, type, normalize, stride * Float32Array.BYTES_PER_ELEMENT, 0);

        gl.enableVertexAttribArray(colourAttribLoc);
        gl.vertexAttribPointer(
            colourAttribLoc,
            4, // rgba
            gl.FLOAT,
            true,
            stride * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );

        gl.enableVertexAttribArray(uvAttribLoc);
        gl.vertexAttribPointer(
            uvAttribLoc,
            2,
            gl.FLOAT,
            false,
            stride * Float32Array.BYTES_PER_ELEMENT,
            (3 + 4) * Float32Array.BYTES_PER_ELEMENT
        );

        gl.drawArrays(gl.TRIANGLES, 0, letterGeometry.length / stride);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

/**
 * Entry point
 */
async function main() {
    const c = getCanvas("gameCanvas");
    gl = getContextFromCanvas(c);

    setup();

    let prevTimestamp = performance.now();
    const tick = (timestamp: number) => {
        // @ts-ignore
        const elapsedSeconds = (timestamp - prevTimestamp) / 1000.0;
        prevTimestamp = timestamp;
        window.requestAnimationFrame(tick);
        // do update
        radians = (timestamp * 0.1 * Math.PI) / 180.0;

        render();
    };

    window.requestAnimationFrame(tick);
}

main().catch((error) => console.log(error));
