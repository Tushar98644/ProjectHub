import axios from "axios";

class GithubService {
    public async getAllRepos() {
        const res = await axios.get("/api/v1/github/repos");
        return res.data;
    }

    public async importRepo(provider: string, data: any) {
        const res = await axios.post(`/api/v1/github/repos/import/`, {
            data,
            provider,
        });
        return res.data;
    }

    public async fetchDiff(url: string, token: string): Promise<string> {
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: "application/vnd.github.v3.diff",
                    "User-Agent": "Insentra/1.0",
                },
            });
            return res.data;
        } catch (error: any) {
            console.error("Error fetching diff:", error.response?.data || error.message);
            return "Could not fetch diff";
        }
    }
}

export const githubService = new GithubService();
