import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { MusicAuthor, MusicAuthorDocument } from 'src/schemas/musicAuthor.schema';
import { Model } from 'mongoose';
export declare class MusicService {
    private jwtHelpService;
    private musicAuthorModel;
    constructor(jwtHelpService: HelpJwtService, musicAuthorModel: Model<MusicAuthorDocument>);
    getAllMusic(): Promise<(MusicAuthor & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getAuthorsStatistics(): Promise<any[]>;
    addMusic(files: any[], request: Request): Promise<void>;
}
