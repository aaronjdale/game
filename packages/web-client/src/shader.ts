export function createShader(gl: WebGL2RenderingContext, shaderType: number, src: string): WebGLShader {
    const shader = gl.createShader(shaderType);
    if (!shader) {
        throw new Error(`Failed to create shader of type ${shaderType}`);
    }

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        gl.deleteShader(shader);
        throw new Error(`Failed to compile shader of type ${shaderType}`);
    }

    return shader;
}

export function createProgram(gl: WebGL2RenderingContext, vert: WebGLShader, frag: WebGLShader) {
    const program = gl.createProgram();
    if (!program) {
        throw new Error(`Failed to create shader program!`);
    }

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        gl.deleteProgram(program);
        throw new Error(`Failed to link shader program.`);
    }

    return program;
}
