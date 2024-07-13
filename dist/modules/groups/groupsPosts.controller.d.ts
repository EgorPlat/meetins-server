import { Request } from 'express';
import { GroupsService } from './groupsPosts.service';
export declare class GroupsController {
    private groupsService;
    constructor(groupsService: GroupsService);
    getAllGroups(request: Request): Promise<any[]>;
    getGroupById(request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    joinToGroup(request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    manageGroupByid(file: any, request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getGroupMembersInfo(request: Request): Promise<void>;
    createNewGroup(request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createNewPostInGroup(files: any, request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createNewTalkInGroup(request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createNewMessageInGroupTalk(request: Request): Promise<{
        userId: any;
        date: Date;
        text: any;
    }>;
    getGroupTalksList(request: Request): Promise<import("../../interfaces/group.interface").IGroupTalk[]>;
    getTalkMessagesInGroupById(request: Request): Promise<import("../../interfaces/group.interface").IGroupTalkMessage[]>;
    addNewCommentIntoPost(params: any, request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    likePostInGroup(params: any, request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    unlikePostInGroup(params: any, request: Request): Promise<import("../../schemas/groups.schema").Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
