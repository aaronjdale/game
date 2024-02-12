import "./style.css";

import vertexShaderString from "./shaders/basic.vert?raw";
import fragmentShaderString from "./shaders/basic.frag?raw";
import { createProgram, getAttributeLocation, getUniformLocation } from "./shader";

const triangleVertices = new Float32Array([
    // top mid
    0.0, 1.0,
    // bottom left
    -1.0, -1.0,
    // bottom right
    1.0, -1.0,
]);
const colours1 = new Uint8Array([255, 0, 0, 0, 255, 0, 0, 0, 255]);
const colours2 = new Uint8Array([229, 47, 15, 246, 206, 29, 233, 154, 26]);

// const shaderurl = new URL("/basic.glsl", import.meta.url).href;
// console.log(`fetching shader from: ${shaderurl}`);
// fetch(shaderurl)
//     .then((response) => response.text())
//     .then((text) => console.log(text));

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

async function main() {
    const canvas = document.querySelector<HTMLCanvasElement>("#gameCanvas");
    if (!canvas) {
        throw new Error("Could not create canvas");
    }

    const gl = canvas.getContext("webgl2");
    if (!gl) {
        throw new Error("Could not create WebGL 2 context.");
    }

    const triangleGeoBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);

    const program = createProgram(gl, vertexShaderString, fragmentShaderString);
    const vertexPositionAttributeLocation = getAttributeLocation(gl, program, "vertexPosition");
    const vertexColourAttributeLocation = getAttributeLocation(gl, program, "vertexColour");

    // output merger
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gl.clearColor(0.08, 0.08, 0.08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

    // rasterizer/camera
    gl.viewport(0, 0, canvas.width, canvas.height);

    // vertex shader+fragment shader
    gl.useProgram(program);
    gl.enableVertexAttribArray(vertexPositionAttributeLocation);

    // input assembler
    const stride = 2 * Float32Array.BYTES_PER_ELEMENT;
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.vertexAttribPointer(vertexPositionAttributeLocation, 2, gl.FLOAT, false, stride, 0);

    // set uniforms
    const canvasSizeUniform = getUniformLocation(gl, program, "canvasSize");
    const locationUniform = getUniformLocation(gl, program, "location");
    const sizeUniform = getUniformLocation(gl, program, "size");

    gl.uniform2f(canvasSizeUniform, canvas.width, canvas.height);

    // primitive assembly

    // triangle 1
    gl.bindBuffer(gl.ARRAY_BUFFER, colours1);
    gl.vertexAttribPointer(vertexColourAttributeLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);

    gl.uniform1f(sizeUniform, 200);
    gl.uniform2f(locationUniform, 300, 400);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // triangle 2
    gl.uniform1f(sizeUniform, 100);
    gl.uniform2f(locationUniform, 100, 100);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

main().catch((error) => showError(error));
