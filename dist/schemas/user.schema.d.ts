/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { IInterests } from "src/interfaces/interests.interface";
import { IPost } from "src/interfaces/post.interface";
import { IOuterInvites, IInnerInvites } from "src/interfaces/sentInvites.interface";
import { IUserTag } from "src/interfaces/tag.interface";
export declare type UserDocument = User & Document;
export declare class User {
    userId: string;
    isFilter: boolean;
    markedUsers: string[];
    name: string;
    status: string;
    phoneNumber: string;
    email: string;
    password: string;
    gender: string;
    avatar: string;
    dateRegister: Date;
    login: number;
    birthDate: Date;
    city: string;
    age: number;
    events: string[];
    posts: IPost[];
    interests: IInterests[];
    outerInvites: IOuterInvites[];
    innerInvites: IInnerInvites[];
    purchasedOpportunities: number[];
    tag: IUserTag;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}, {}>;
