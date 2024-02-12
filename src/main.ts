import "./style.css";

import vertexShaderString from "./shaders/basic.vert?raw";
import fragmentShaderString from "./shaders/basic.frag?raw";

// const shaderurl = new URL("/basic.glsl", import.meta.url).href;

// console.log(`fetching shader from: ${shaderurl}`);
// fetch(shaderurl)
//     .then((response) => response.text())
//     .then((text) => console.log(text));

function showError(error: string) {
    const errorBoxDiv = document.getElementById("errorBox");
    const textElement = document.createElement("p");
    textElement.innerText = error;
    errorBoxDiv?.appendChild(textElement);
    console.error(error);
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

    const triangleVertices = [
        // top mid
        0.0, 0.5,
        // bottom left
        -0.5, -0.5,
        // bottom right
        0.5, -0.5,
    ];

    const triangleVerticesCpuBuffer = new Float32Array(triangleVertices);

    const triangleGeoBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVerticesCpuBuffer, gl.STATIC_DRAW);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
        throw new Error("Failed to create vertex shader");
    }
    gl.shaderSource(vertexShader, vertexShaderString);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const compileError = gl.getShaderInfoLog(vertexShader);
        throw new Error(`Failed to compile vertex shader: ${compileError}`);
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
        throw new Error("Failed to create fragment shader");
    }
    gl.shaderSource(fragmentShader, fragmentShaderString);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        const compileError = gl.getShaderInfoLog(fragmentShader);
        throw new Error(`Failed to compile fragment shader: ${compileError}`);
    }

    const program = gl.createProgram();
    if (!program) {
        throw new Error("Failed to create shader program.");
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const linkError = gl.getProgramInfoLog(program);
        throw new Error(`Failed to link shader program: ${linkError}`);
    }

    const attibuteName = "vertexPosition";
    const vertexPositionAttributeLocation = gl.getAttribLocation(program, attibuteName);
    if (vertexPositionAttributeLocation < 0) {
        throw new Error(`Failed to get attribute location: ${attibuteName}`);
    }

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
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.vertexAttribPointer(vertexPositionAttributeLocation, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

    // primitive assembly
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

main().catch((error) => showError(error));
