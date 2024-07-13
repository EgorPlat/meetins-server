import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Group, GroupsDocument } from 'src/schemas/groups.schema';
import { UserDocument } from 'src/schemas/user.schema';
export declare class GroupsService {
    private jwtHelpService;
    private groupsModel;
    private usersModel;
    constructor(jwtHelpService: HelpJwtService, groupsModel: Model<GroupsDocument>, usersModel: Model<UserDocument>);
    getAllGroups(request: Request): Promise<any[]>;
    getGroupById(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    joinToGroup(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    manageGroupByid(file: any, request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getGroupMembersInfo(request: Request): Promise<void>;
    createNewGroup(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createNewPostInGroup(files: any, request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createNewTalkInGroup(request: Request): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    addNewMessageInGroupTalk(request: Request): Promise<import("src/interfaces/group.interface").IGroupTalkMessage[]>;
    getGroupTalksList(request: Request): Promise<import("src/interfaces/group.interface").IGroupTalk[]>;
    createNewMessageInGroupTalk(request: Request): Promise<{
        userId: any;
        date: Date;
        text: any;
    }>;
    getTalkMessagesInGroupById(request: Request): Promise<import("src/interfaces/group.interface").IGroupTalkMessage[]>;
    addNewCommentIntoPost(request: Request, groupId: number, postId: number): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    likePostInGroup(request: any, groupId: string, postId: string): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    unlikePostInGroup(request: any, groupId: string, postId: string): Promise<Group & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
