export interface IEventsInfo {
    nameCategory: string,
    page: number
}
export interface IShortEventInfo {
    id: number,
    title: string,
    description: string,
    age_restriction: string,
    price: string,
    images: any[]
}
export interface IEventComments {
    id: number,
    date_posted: number,
    text: string,
    user: {
        name: string,
        avatar: string
    },
    is_deleted: boolean,
    replies_count: number,
    thread: any,
    reply_to: any
}