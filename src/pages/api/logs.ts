import LokiTransport from "winston-loki";
import { createLogger, transports } from "winston";

const options = {
    transports: [
        new LokiTransport({
            host: "http://192.168.0.100:3100",
        }),
    ],
};

const logger = createLogger(options);
export default logger;
