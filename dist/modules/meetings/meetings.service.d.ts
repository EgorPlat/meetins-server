import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { MeetingDocument } from 'src/schemas/meeting.schema';
export declare class MeetingsService {
    private jwtHelpService;
    private meetingModel;
    constructor(jwtHelpService: HelpJwtService, meetingModel: Model<MeetingDocument>);
    getAllMeetings(): Promise<string>;
}
