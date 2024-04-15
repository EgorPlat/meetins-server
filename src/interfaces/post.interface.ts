export interface IPost {
    id: string,
    title: string,
    files: {
        src: string,
        type: string
    }[],
    date: string,
    description: string,
    likes: string[]
}
export type Post = IPost;