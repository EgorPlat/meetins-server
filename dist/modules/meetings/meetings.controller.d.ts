import { Request } from 'express';
import { MeetingsService } from './meetings.service';
export declare class MeetingsController {
    private meetingsService;
    constructor(meetingsService: MeetingsService);
    getAllMeetings(): Promise<(import("../../schemas/meeting.schema").Meeting & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    createNewMeeting(request: Request): Promise<import("../../schemas/meeting.schema").Meeting & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
