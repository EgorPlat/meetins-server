/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { MeetingComment } from "src/interfaces/meetingComment.interface";
export declare type MeetingDocument = Meeting & Document;
export declare class Meeting {
    meetingId: string;
    participants: string[];
    date: Date;
    description: string;
    goal: string;
    maxParticipants: string;
    comments: MeetingComment[];
    preview: string;
    title: string;
    address: string;
    creatorId: string;
    files: {
        src: string;
        type: string;
    }[];
}
export declare const MeetingSchema: import("mongoose").Schema<Document<Meeting, any, any>, import("mongoose").Model<Document<Meeting, any, any>, any, any, any>, {}, {}>;
