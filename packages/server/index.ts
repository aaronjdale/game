import { TEST_VALUE } from "math";

const server = Bun.serve<{ authToken: string }>({
    fetch(req, server) {
        const success = server.upgrade(req);
        if (success) {
            return undefined;
        }
        return new Response("hello world");
    },
    websocket: {
        async message(ws, message) {
            console.log(`received: ${message}`);
            ws.send(`echo: ${message}`);
        },
        open(ws) {
            console.log("opened");
        },
        close(ws, code, reason) {
            console.log(`${code}:${reason}`);
        },
    },
});

console.log(`listening on ${server.hostname}:${server.port}`);
