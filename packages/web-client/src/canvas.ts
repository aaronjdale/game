/**
 * Gets the specified canvas element by ID in the document. Throws an error if canvas not found.
 * @param id String ID of the canvas to find
 * @returns HTMLCanvasElement
 */
export function getCanvasByID(id: string) {
    let elementId = id;
    if (!id.startsWith("#")) {
        elementId = `#${id}`;
    }
    let c = document.querySelector<HTMLCanvasElement>(elementId);
    if (!c) {
        const availableCanvases = document.querySelectorAll("canvas");
        const ids: string[] = [];
        availableCanvases.forEach((c) => ids.push(c.id));
        throw new Error(`Failed to get canvas named "${id}", found available canvases:[${ids.join(",")}]`);
    }
    return c;
}

/**
 * Gets a WebGL2 context from the specified canvas.
 * @param canvas HTMLCanvasElement
 * @returns WebGL2RenderingContext
 */
export function getContextFromCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("webgl2");
    if (!context) {
        throw new Error("Failed to get WebGL2 Context from specified canvas.");
    }
    return context;
}
