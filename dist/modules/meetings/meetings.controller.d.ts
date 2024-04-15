/// <reference types="multer" />
import { Request } from 'express';
import { MeetingsService } from './meetings.service';
export declare class MeetingsController {
    private meetingsService;
    constructor(meetingsService: MeetingsService);
    getAllMeetings(): Promise<{
        meetingId: string;
        date: Date;
        description: string;
        goal: string;
        maxParticipants: string;
        comments: import("../../interfaces/meetingComment.interface").MeetingComment[];
        preview: string;
        title: string;
        address: string;
        files: {
            src: string;
            type: string;
        }[];
        participants: (import("../../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        creatorId: string;
    }[]>;
    createNewMeeting(request: Request): Promise<import("../../schemas/meeting.schema").Meeting & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    uploadMedia(request: Request, file: Express.Multer.File): Promise<{
        meetingId: string;
        date: Date;
        description: string;
        goal: string;
        maxParticipants: string;
        comments: import("../../interfaces/meetingComment.interface").MeetingComment[];
        preview: string;
        title: string;
        address: string;
        files: {
            src: string;
            type: string;
        }[];
        participants: (import("../../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
    }>;
    regInMeetings(request: Request, meetingId: any): Promise<{
        meetingId: string;
        date: Date;
        description: string;
        goal: string;
        maxParticipants: string;
        comments: import("../../interfaces/meetingComment.interface").MeetingComment[];
        preview: string;
        title: string;
        address: string;
        files: {
            src: string;
            type: string;
        }[];
        participants: (import("../../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
    }>;
    sendCommentAboutMeeting(request: Request): Promise<import("../../schemas/meeting.schema").Meeting & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserPlaces(params: any, request: Request): Promise<string[]>;
}
