export interface IGroupPostComment {
    userId: string;
    userAvatar: string;
    text: string;
    date: Date;
}
export interface IGroupPost {
    id: number;
    title: string;
    files: IGroupFile[];
    date: number;
    description: string;
    likes: number;
    views: number;
    comments: IGroupPostComment[];
}
export interface IGroupFile {
    src: string;
    type: string;
}
export declare type Post = IGroupPost;
export interface IGroupTalkMessage {
    userId: string;
    date: Date;
    text: string;
}
export interface IGroupTalk {
    id: number;
    title: string;
    dateOfCreation: Date;
    messages: IGroupTalkMessage[];
}
