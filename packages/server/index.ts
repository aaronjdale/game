import * as Sentry from "@sentry/bun";

import { TEST_VALUE } from "math";

const env = process.env.NODE_ENV;
const debug = process.env.NODE_ENV === "development";
console.log(env);
console.log(debug);
console.log(process.env.GAMESERV_SENTRY_DSN);

Sentry.init({
    environment: env,
    dsn: process.env.GAMESERV_SENTRY_DSN,
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
});

const server = Bun.serve<{ authToken: string }>({
    port: 3000,
    fetch(req, server) {
        const success = server.upgrade(req);
        if (success) {
            return undefined;
        }
        return new Response(`hello world???: ${TEST_VALUE}:${env}`);
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

try {
    throw new Error("Sentry Bun test");
} catch (e) {
    Sentry.captureException(e);
}
