import crypto from "crypto";

export const verifyWebhookSignature = (rawPayload: string, signature: string, secret: string): boolean => {
    const hmac = crypto.createHmac("sha256", secret).update(rawPayload, "utf8").digest("hex");
    const expected = `sha256=${hmac}`;

    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expected);

    return sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);
};
