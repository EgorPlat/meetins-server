import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { MusicAuthor, MusicAuthorDocument } from 'src/schemas/musicAuthor.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
export declare class MusicService {
    private jwtHelpService;
    private musicAuthorModel;
    private userModel;
    constructor(jwtHelpService: HelpJwtService, musicAuthorModel: Model<MusicAuthorDocument>, userModel: Model<UserDocument>);
    getAllMusic(): Promise<(MusicAuthor & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getAuthorsStatistics(): Promise<any[]>;
    getAuthorStatistics(request: Request): Promise<any[]>;
    addMusic(files: any[], request: Request): Promise<void>;
    addPlaysNumber(request: Request, authorId: string, trackId: string): Promise<MusicAuthor & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getMatchesList(request: Request): Promise<any[]>;
    getAuthorCurrentName(request: Request): Promise<string>;
}
