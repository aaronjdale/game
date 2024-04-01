class OBJParserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OBJParserError";
    }
}

type xy = {
    x: number;
    y: number;
};
type xyz = xy & { z: number };

export type vertex = {
    x: number;
    y: number;
    z: number;
    u: number;
    v: number;
    nx: number;
    ny: number;
    nz: number;
};

function parseXY(text: string): xy {
    const [xStr, yStr] = text.split(/\s+/);
    return {
        x: parseFloat(xStr),
        y: parseFloat(yStr),
    };
}
function parseXYZ(text: string): xyz {
    const [xStr, yStr, zStr] = text.split(/\s+/);
    return {
        x: parseFloat(xStr),
        y: parseFloat(yStr),
        z: parseFloat(zStr),
    };
}

export function parseObj(text: string) {
    const lines = text.split("\n");

    const positions: xyz[] = [{ x: 0, y: 0, z: 0 }];
    const normals: xyz[] = [{ x: 0, y: 0, z: 0 }];
    const texCoords: xy[] = [{ x: 0, y: 0 }];

    const vertices: vertex[] = [];

    /**
     * Parses a vertex from a face entry
     * @param vertexString
     * @returns
     */
    const parseVertex = (vertexString: string): vertex => {
        const parts = vertexString.split("/");

        const indices = parts.map((v) => (v ? parseInt(v) : 0));

        const pos = positions[indices[0]];
        const tex = texCoords[indices[1]];
        const nor = normals[indices.length > 1 ? indices[2] : 0];

        const v: vertex = {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            u: tex.x,
            v: tex.y,
            nx: nor.x,
            ny: nor.y,
            nz: nor.z,
        };

        return v;
    };

    /**
     * Keyword handler function map
     */
    const handlers: Record<any, (data: string) => void> = {
        v: (data: string) => positions.push(parseXYZ(data)),
        vn: (data: string) => normals.push(parseXYZ(data)),
        vt: (data: string) => texCoords.push(parseXY(data)),
        f: (data: string) => {
            const parts = data.split(/\s+/);
            const numTriangles = parts.length - 2;

            for (let i = 0; i < numTriangles; ++i) {
                const a = parseVertex(parts[0]);
                const b = parseVertex(parts[i + 1]);
                const c = parseVertex(parts[i + 2]);
                vertices.push(a);
                vertices.push(b);
                vertices.push(c);
            }
        },
        mtllib: (data: string) => {
            console.log("not handled");
        },
        usemtl: (data: string) => {
            console.log("not handled");
        },
        o: (data: string) => {
            console.log("not handled");
        },
        s: (data: string) => {
            console.log("not handled");
        },
    };

    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i].trim();

        // skip empty lines and comment lines
        if (!line || line.startsWith("#")) {
            continue;
        }

        // get the line type and the data after it
        const keywordRE = /(\w*)(?: )*(.*)/;
        const m = keywordRE.exec(line);
        if (!m) {
            continue;
        }
        const [, keyword, args] = m;

        // handle the keyword
        const h = handlers[keyword];
        if (!h) {
            throw new OBJParserError(`Unhandled keyword: ${keyword}`);
        }
        h(args);
    }

    return vertices;
}
