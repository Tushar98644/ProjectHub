import { register, collectDefaultMetrics } from "prom-client";

collectDefaultMetrics();

export const metricsRegistry = register;
