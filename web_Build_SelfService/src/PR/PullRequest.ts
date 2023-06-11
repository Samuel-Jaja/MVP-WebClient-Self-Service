export interface PullRequest {
    id: string;
    title: string;
    user: {
        login: string;
    };
    state: string;
    created_at: string;
    number: number;
}