export interface Repo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    owner: { login: string };
}
