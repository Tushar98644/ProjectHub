// import logger from "@/lib/logger";

export async function GET() {
    // logger.info("Log from App Route");

    return Response.json({ message: "Logged!" });
}
