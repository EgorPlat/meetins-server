/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type MusicDocument = Music & Document;
export declare class Music {
    musicId: number;
    title: string;
    authorId: string;
    image: string;
}
export declare const MusicSchema: import("mongoose").Schema<Document<Music, any, any>, import("mongoose").Model<Document<Music, any, any>, any, any, any>, {}, {}>;
