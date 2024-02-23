/**
 * Creates a buffer object or throws and error if unsuccessful.
 * @param gl
 * @returns
 */
export function createBuffer(gl: WebGL2RenderingContext): WebGLBuffer {
    const buffer = gl.createBuffer();
    if (!buffer) {
        throw new Error("Failed to create buffer.");
    }
    return buffer;
}
