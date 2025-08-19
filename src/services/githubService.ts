import axios from "axios";

class GithubService {
    public async getAllRepos() {
        const res = await axios.get("/api/v1/github/repos");
        return res.data;
    }
}

export const githubService = new GithubService();
