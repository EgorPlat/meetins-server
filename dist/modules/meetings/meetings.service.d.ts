import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from 'src/schemas/meeting.schema';
export declare class MeetingsService {
    private jwtHelpService;
    private meetingModel;
    constructor(jwtHelpService: HelpJwtService, meetingModel: Model<MeetingDocument>);
    getAllMeetings(): Promise<string>;
    createNewMeeting(request: Request): Promise<Meeting & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
