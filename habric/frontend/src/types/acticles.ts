export interface IActicles {
    id: number;
    author: string;
    text?: string;
    name: string;
    watcher: number;
    image: string;
    tags: string[];
} 

export interface IComment {
    id: number;
    author: string;
    to?: number;
    text: string;
    slay: number;
}

export interface IUser {
    id: number;
    name: string;
    password: string;
}