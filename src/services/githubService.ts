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
}

export const githubService = new GithubService();
