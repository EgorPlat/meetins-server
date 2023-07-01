/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { CreateUserDto } from "src/dto/create-user.dto";
import { ISortParams } from "src/interfaces/sort.params";
import { User } from "src/schemas/user.schema";
import { UserService } from "./users.service";
import { Request } from "express";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
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
    getSortedPeoples(sortParams: ISortParams): Promise<void>;
    addUserEvent(request: Request): Promise<User>;
    deleteUserEvent(request: Request): Promise<User>;
    addUserPost(file: any, request: Request): Promise<void>;
}
