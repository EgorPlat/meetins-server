/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { IMessage } from "src/interfaces/chatMessage.interface";
export declare type ChatDocument = Chat & Document;
export declare class Chat {
    dialogId: string;
    messages: IMessage[];
    members: string[];
}
export declare const ChatSchema: import("mongoose").Schema<Document<Chat, any, any>, import("mongoose").Model<Document<Chat, any, any>, any, any, any>, {}, {}>;
