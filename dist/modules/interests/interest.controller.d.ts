/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { InterestsService } from './interest.service';
import { Request } from 'express';
export declare class InterestsController {
    private interestsService;
    constructor(interestsService: InterestsService);
    getInterestsById(request: Request): Promise<any[]>;
    getInterests(request: Request): Promise<(import("../../schemas/interests.schema").Interest & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    addInterests(request: Request): Promise<import("../../schemas/interests.schema").Interest & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
