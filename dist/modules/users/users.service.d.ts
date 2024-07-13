import { User, UserDocument } from "src/schemas/user.schema";
import { Model } from 'mongoose';
import { CreateUserDto } from "src/dto/create-user.dto";
import { IPeople } from "src/interfaces/people.interface";
import { ISortParams } from "src/interfaces/sort.params";
import { IAccount } from "src/interfaces/account.interface";
import { IProfile } from "src/interfaces/profile.interface";
import { HelpJwtService } from "src/help/token.service";
import { Request } from 'express';
export declare class UserService {
    private userModel;
    private helpJwtService;
    constructor(userModel: Model<UserDocument>, helpJwtService: HelpJwtService);
    updateUsersData(): Promise<void>;
    getUsers(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    addUser(dto: CreateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserByLogin(login: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserByLoginMainInfoOnly(login: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserList(): Promise<IPeople[]>;
    addUserIntoMarkedList(request: Request): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    formMarkedUsersInfoByIds(userId: string): Promise<any[]>;
    updateUserTag(request: Request): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getMarkedUsersInfo(request: Request): Promise<any[]>;
    removeUserFromMarkedList(request: Request, removedUserId: string): Promise<any[]>;
    getUserListByPageNumber(request: Request): Promise<{
        peoples: IPeople[];
        maxPage: number;
    }>;
    getSortedPeoples(sortParams: ISortParams): Promise<void>;
    getUpdatedUserByEmail(email: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserByEmail(email: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserByUserId(userId: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updateUserStatus(decodedToken: any, status: string): Promise<User>;
    updateUserFilterStatus(decodedToken: any, filterStatus: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updateUserAccount(decodedToken: any, accountData: IAccount): Promise<User>;
    updateUserProfile(decodedToken: any, accountData: IProfile): Promise<User>;
    updateUserAvatar(file: any, user: User): Promise<User>;
    updateUserBirthDate(userEmail: string, date: Date): Promise<void>;
    addUserEvent(request: Request): Promise<User>;
    deleteUserEvent(request: Request): Promise<User>;
    updateUserInterest(request: Request): Promise<User>;
    removeUserInterest(request: Request): Promise<User>;
    addUserPost(files: any, request: Request): Promise<void>;
    addLikeToUserPost(request: Request, postId: string, userId: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    removeLikeFromUserPost(request: Request, postId: string, userId: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
