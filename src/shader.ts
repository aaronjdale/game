/**
 * Just to make debug printing a bit nicer
 * @param gl
 * @param shaderType
 * @returns
 */
function shaderTypeToString(gl: WebGL2RenderingContext, shaderType: number): string {
    switch (shaderType) {
        case gl.FRAGMENT_SHADER:
            return "fragment";
        case gl.VERTEX_SHADER:
            return "vertex";
        default:
            return "unknown";
    }
}

/**
 * Creates a shader
 * @param gl
 * @param shaderType
 * @param shaderSource
 * @returns
 */
export function createShader(gl: WebGL2RenderingContext, shaderType: number, shaderSource: string): WebGLShader {
    const shader = gl.createShader(shaderType);
    if (!shader) {
        throw new Error(`Failed to create new ${shaderTypeToString(gl, shaderType)} shader.`);
    }
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const compileError = gl.getShaderInfoLog(shader);
        throw new Error(`Failed to compile ${shaderTypeToString(gl, shaderType)} shader: ${compileError}`);
    }

    return shader;
}

export function createProgram(
    gl: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
): WebGLProgram {
    // todo: maybe error check the values coming in, empty strings, etc but realistically it'll get caught in the compile step

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

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

    return program;
}

export function getAttributeLocation(gl: WebGL2RenderingContext, program: WebGLProgram, attribute: string) {
    const location = gl.getAttribLocation(program, attribute);
    if (location < 0) {
        throw new Error(`Failed to get attribute location: ${attribute}`);
    }
    return location;
}

export function getUniformLocation(gl: WebGL2RenderingContext, program: WebGLProgram, uniform: string) {
    const location = gl.getUniformLocation(program, uniform);
    if (location === null) {
        throw new Error(`Failed to get uniform location: ${uniform}`);
    }
    return location;
}
