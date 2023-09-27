export interface IGroupPost {
    id: number;
    title: string;
    file: {
        src: string;
        type: string;
    } | null;
    date: string;
    description: string;
    likes: number;
    views: number;
}
export declare type Post = IGroupPost;
