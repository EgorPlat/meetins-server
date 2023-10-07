/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
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
    createNewPostInGroup(files: any, request: Request): Promise<import("../../interfaces/groupPost.interface").IGroupPost>;
}
