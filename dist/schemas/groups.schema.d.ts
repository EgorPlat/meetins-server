/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type GroupsDocument = Group & Document;
export declare class Group {
    groupId: number;
    name: string;
    description: string;
    mainAvatar: string;
    headAvatar: string;
    membersId: string[];
    creatorId: string;
}
export declare const GroupSchema: import("mongoose").Schema<Document<Group, any, any>, import("mongoose").Model<Document<Group, any, any>, any, any, any>, {}, {}>;
