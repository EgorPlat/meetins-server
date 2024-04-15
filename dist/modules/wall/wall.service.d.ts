import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { GroupsDocument } from 'src/schemas/groups.schema';
export declare class WallService {
    private jwtHelpService;
    private usersModel;
    private groupsModel;
    constructor(jwtHelpService: HelpJwtService, usersModel: Model<UserDocument>, groupsModel: Model<GroupsDocument>);
    getCurrentWall(request: Request): Promise<{
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
