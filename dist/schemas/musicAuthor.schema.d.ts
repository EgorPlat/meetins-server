/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type MusicAuthorDocument = MusicAuthor & Document;
export declare class MusicAuthor {
    authorId: string;
    name: string;
    compositions: {
        id: number;
        audioSrc: string;
        imageSrc: string;
        title: string;
        description: string;
        playsNumber: number;
    }[];
}
export declare const MusicAuthorSchema: import("mongoose").Schema<Document<MusicAuthor, any, any>, import("mongoose").Model<Document<MusicAuthor, any, any>, any, any, any>, {}, {}>;
