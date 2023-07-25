import { MeetingsService } from './meetings.service';
export declare class MeetingsController {
    private meetingsService;
    constructor(meetingsService: MeetingsService);
    getAllMeetings(): Promise<string>;
}
