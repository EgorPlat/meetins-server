import { Request } from 'express';
import { WallService } from './wall.service';
export declare class WallController {
    private wallService;
    constructor(wallService: WallService);
    getAllMusic(request: Request): Promise<{
        postTitle: any;
        postDescription: any;
        postDate: any;
        postLikes: any;
        postFiles: any;
        name: any;
        avatar: any;
        isGroup: any;
        linkId: any;
    }[]>;
}
