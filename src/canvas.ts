/**
 * Gets a canvas by ID
 * @param id
 * @returns
 */
export function getCanvas(id: string) {
    let elementId = id;
    if (!id.startsWith("#")) {
        elementId = `#${id}`;
    }
    let c = document.querySelector<HTMLCanvasElement>(elementId);
    if (!c) {
        const canvases = document.querySelectorAll("canvas");
        const ids: string[] = [];
        canvases.forEach((c) => {
            ids.push(c.id);
        });

        throw new Error(`Failed to get canvas named "${id}", found canvases with ids: [${ids.join(",")}]`);
    }
    return c;
}

/**
 * Gets a WebGL2 context from the specified canvas.
 * @param canvas
 * @returns
 */
export function getContextFromCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("webgl2");
    if (!context) {
        throw new Error("Faield to get WebGL2 Context from canvas.");
    }
    return context;
}

export function resizeCanvas(canvas: HTMLCanvasElement, multiplier: number = 1) {
    const width = (canvas.clientWidth * multiplier) | 0;
    const height = (canvas.clientHeight * multiplier) | 0;

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
