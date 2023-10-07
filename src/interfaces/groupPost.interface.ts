export interface IGroupPostComment {
    userId: string,
    userAvatar: string,
    text: string,
    date: Date
}
export interface IGroupPost {
    id: number,
    title: string,
    files: IGroupFile[],
    date: number,
    description: string,
    likes: number,
    views: number,
    comments: IGroupPostComment[]
}
export interface IGroupFile {
    src: string,
    type: string
}
export type Post = IGroupPost;