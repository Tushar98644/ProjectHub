import { createLogger, transports, format } from "winston";
import LokiTransport from "winston-loki";

const logger = createLogger({
    level: "info",
    format: format.json(),
    transports: [
        new LokiTransport({
            host: "http://192.168.0.100:3100",
            labels: { job: "nextjs-app" },
            json: true,
            replaceTimestamp: true,
        }),
    ],
});

export default logger;
