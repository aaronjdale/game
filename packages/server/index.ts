import { TEST_VALUE } from "math";

const server = Bun.serve<{ authToken: string }>({
    port: 3000,
    fetch(req, server) {
        const success = server.upgrade(req);
        if (success) {
            return undefined;
        }
        return new Response(`hello world???: ${TEST_VALUE}`);
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
console.log(TEST_VALUE);
console.log(`listening on ${server.hostname}:${server.port}`);
