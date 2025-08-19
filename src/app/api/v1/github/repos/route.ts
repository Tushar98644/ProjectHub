import { auth } from "@/config/auth/server";
import axios from "axios";
import { headers } from "next/headers";

export async function GET(req: Request) {
    try {
        const tokenResp = await auth.api.getAccessToken({
            body: { providerId: "github" },
            headers: await headers(),
        });

        const accessToken = tokenResp?.accessToken;
        if (!accessToken) {
            return Response.json({ error: "not_connected" }, { status: 401 });
        }

        const res = await axios.get("https://api.github.com/user/repos?type=owner&per_page=100", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github+json",
            },
        });

        if (res.status === 401) {
            return Response.json({ error: "token_invalid" }, { status: 401 });
        }

        return Response.json(res.data, { status: 200 });
    } catch (err) {
        console.error("GET /api/github/repos error:", err);
        return Response.json({ error: "server_error" }, { status: 500 });
    }
}
