import { Request } from 'express';
import { GroupsService } from './groupsPosts.service';
export declare class GroupsController {
    private groupsService;
    constructor(groupsService: GroupsService);
    getAllGroups(request: Request): Promise<(import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getGroupById(request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getGroupMembersInfo(request: Request): Promise<void>;
    createNewGroup(request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
