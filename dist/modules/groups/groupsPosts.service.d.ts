import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Group, GroupsDocument } from 'src/schemas/groups.schema';
export declare class GroupsService {
    private jwtHelpService;
    private groupsModel;
    constructor(jwtHelpService: HelpJwtService, groupsModel: Model<GroupsDocument>);
    getAllGroups(request: Request): Promise<(Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getGroupById(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createNewGroup(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
