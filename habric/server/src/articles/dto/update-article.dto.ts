export interface UpdateArticleDto {
    id: number;
    author?: string;
    text?: string;
    name?: string;
    watcher?: number;
    image?: string;
    tags?: string;
}