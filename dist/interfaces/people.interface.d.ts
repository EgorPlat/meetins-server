import { IUserTag } from "./tag.interface";
export interface IPeople {
    login: number;
    userName: string;
    userAvatar: string;
    status: string;
    age: number;
    city: string;
    gender: string;
    email: string;
    tag: IUserTag;
}
export declare type People = IPeople;
