/// <reference types="multer" />
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from 'src/schemas/meeting.schema';
import { MeetingComment } from 'src/interfaces/meetingComment.interface';
import { User, UserDocument } from 'src/schemas/user.schema';
export declare class MeetingsService {
    private jwtHelpService;
    private meetingModel;
    private userModel;
    constructor(jwtHelpService: HelpJwtService, meetingModel: Model<MeetingDocument>, userModel: Model<UserDocument>);
    getAllMeetings(): Promise<{
        meetingId: string;
        date: Date;
        description: string;
        goal: string;
        maxParticipants: string;
        comments: MeetingComment[];
        preview: string;
        title: string;
        address: string;
        files: {
            src: string;
            type: string;
        }[];
        participants: (User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        creatorId: string;
    }[]>;
    createNewMeeting(request: Request): Promise<Meeting & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    uploadMedia(request: Request, file: Express.Multer.File): Promise<{
        meetingId: string;
        date: Date;
        description: string;
        goal: string;
        maxParticipants: string;
        comments: MeetingComment[];
        preview: string;
        title: string;
        address: string;
        files: {
            src: string;
            type: string;
        }[];
        participants: (User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
    }>;
    regInMeetings(request: Request, meetingId: string): Promise<{
        meetingId: string;
        date: Date;
        description: string;
        goal: string;
        maxParticipants: string;
        comments: MeetingComment[];
        preview: string;
        title: string;
        address: string;
        files: {
            src: string;
            type: string;
        }[];
        participants: (User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
    }>;
    sendCommentAboutMeeting(request: Request): Promise<Meeting & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserPlaces(request: Request, userId: string): Promise<string[]>;
}
