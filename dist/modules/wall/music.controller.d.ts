import { Request } from 'express';
import { MusicService } from './music.service';
export declare class MusicController {
    private musicService;
    constructor(musicService: MusicService);
    getAllMusic(request: Request): Promise<(import("../../schemas/musicAuthor.schema").MusicAuthor & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getAuthorsStatistics(request: Request): Promise<any[]>;
    addMusic(files: any, request: Request): Promise<void>;
}
