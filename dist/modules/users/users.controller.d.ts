import { CreateUserDto } from "src/dto/create-user.dto";
import { ISortParams } from "src/interfaces/sort.params";
import { User } from "src/schemas/user.schema";
import { UserService } from "./users.service";
import { Request } from "express";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateUserData(): Promise<void>;
    getUsers(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    addUser(userDto: CreateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserByLogin(login: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserByUserId(req: Request): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    removeUserInterest(req: Request): Promise<User>;
    updateUserInterest(req: Request): Promise<User>;
    getUserList(): Promise<import("src/interfaces/people.interface").IPeople[]>;
    getUserListByPageNumber(request: Request): Promise<{
        peoples: import("src/interfaces/people.interface").IPeople[];
        maxPage: number;
    }>;
    addUserIntoMarkedList(request: Request): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    removeUserFromMarkedList(params: any, request: Request): Promise<any[]>;
    getMarkedUsersInfo(request: Request): Promise<any[]>;
    getSortedPeoples(sortParams: ISortParams): Promise<void>;
    addUserEvent(request: Request): Promise<User>;
    deleteUserEvent(request: Request): Promise<User>;
    updateUserTag(request: Request): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    addUserPost(files: any, request: Request): Promise<void>;
    addLikeToUserPost(params: any, request: Request): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    removeLikeFromUserPost(params: any, request: Request): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
