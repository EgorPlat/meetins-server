import { HttpService } from '@nestjs/axios';
import { IEventsInfo } from 'src/interfaces/events.interface';
import { CheckService } from 'src/help/ckeck.service';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/modules/users/users.service';
import { MailService } from 'src/modules/mail/mail.service';
export declare class EventService {
    private httpService;
    private checkService;
    private jwtHelpService;
    private userService;
    private mailService;
    private userModel;
    constructor(httpService: HttpService, checkService: CheckService, jwtHelpService: HelpJwtService, userService: UserService, mailService: MailService, userModel: Model<UserDocument>);
    getUserOuterInvitesEventInfo(request: Request): Promise<void>;
    getUserInnerInvitesEventInfo(request: Request): Promise<void>;
    getUserEventsInfo(request: Request): Promise<void>;
    getEventsByCategory(eventsInfo: IEventsInfo): Promise<any>;
    getEventInfoById(eventId: string | number): Promise<any>;
    getCommentsForEventById(eventId: string | number): Promise<any>;
    sendInviteToUser(request: Request): Promise<{
        message: string;
    }>;
    declineInnerInvite(request: Request): Promise<any>;
}
