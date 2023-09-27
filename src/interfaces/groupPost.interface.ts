/*export interface IGroupPostComment {
    userId: string,
    userAvatar: string,
    text: string,
    date: Date
}*/
export interface IGroupPost {
    id: number,
    title: string,
    file: {
        src: string,
        type: string
    } | null,
    date: string,
    description: string,
    likes: number,
    views: number,
    //comments: IGroupPostComment[]
}
export type Post = IGroupPost;