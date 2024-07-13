import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppGateway } from 'src/app.gateway';
import { Interest, InterestDocument } from 'src/schemas/interests.schema';
import { UserService } from 'src/modules/users/users.service';
import { Model } from 'mongoose';
export declare class InterestsService {
    private jwtService;
    private userService;
    private socketServer;
    private interestsModel;
    constructor(jwtService: JwtService, userService: UserService, socketServer: AppGateway, interestsModel: Model<InterestDocument>);
    getInterests(request: Request): Promise<(Interest & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getInterestsById(request: Request): Promise<any[]>;
    addInterests(request: Request): Promise<Interest & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
