import { NextApiResponse, NextApiRequest } from "next";
import { register, collectDefaultMetrics } from "prom-client";

// collectDefaultMetrics();

const metricsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-type", register.contentType);
    res.send(await register.metrics());
    console.log(await register.metrics());
};

export default metricsHandler;
