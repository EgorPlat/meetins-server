/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Request } from 'express';
import { MusicService } from './music.service';
export declare class MusicController {
    private musicService;
    constructor(musicService: MusicService);
    getAllMusic(request: Request): Promise<(import("../../schemas/musicAuthor.schema").MusicAuthor & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getAuthorsStatistics(request: Request): Promise<any[]>;
    getAuthorStatistics(request: Request): Promise<any[]>;
    addMusic(files: any, request: Request): Promise<void>;
    addPlaysNumber(params: any, request: Request): Promise<import("../../schemas/musicAuthor.schema").MusicAuthor & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getMatchesList(request: Request): Promise<any[]>;
    getAuthorCurrentName(request: Request): Promise<string>;
}
