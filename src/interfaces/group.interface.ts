export interface IGroup {
    groupId: number;
    name: string;
    description: string;
    mainAvatar: string;
    headAvatar: string | null;
    membersId: string[];
    creatorId: string;
    posts: IGroupPost[];
    talks: IGroupTalk[]
}

export interface IGroupPostComment {
    userId: string,
    avatar: string,
    text: string,
    date: Date
}
export interface IGroupPost {
    id: number,
    title: string,
    files: IGroupFile[],
    date: number,
    description: string,
    likes: string[],
    views: number,
    comments: IGroupPostComment[]
}
export interface IGroupFile {
    src: string,
    type: string
}
export type Post = IGroupPost;


export interface IGroupTalkMessage {
    userId: string,
    date: Date,
    text: string
}
export interface IGroupTalk {
    id: number,
    title: string,
    dateOfCreation: Date,
    messages: IGroupTalkMessage[]
}