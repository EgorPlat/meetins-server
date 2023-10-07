import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Group, GroupsDocument } from 'src/schemas/groups.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { IGroupPost } from 'src/interfaces/groupPost.interface';
export declare class GroupsService {
    private jwtHelpService;
    private groupsModel;
    private usersModel;
    constructor(jwtHelpService: HelpJwtService, groupsModel: Model<GroupsDocument>, usersModel: Model<UserDocument>);
    getAllGroups(request: Request): Promise<(Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getGroupById(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getGroupMembersInfo(request: Request): Promise<void>;
    createNewGroup(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createNewPostInGroup(files: any, request: Request): Promise<IGroupPost>;
}
