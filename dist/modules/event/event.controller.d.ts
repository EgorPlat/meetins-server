import { EventService } from './event.service';
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    getEventsByCategory(request: any): Promise<any>;
    getEventInfoById(request: any): Promise<any>;
    getCommentsForEventById(request: any): Promise<any>;
    sendInviteToUser(request: any): Promise<{
        message: string;
    }>;
    getUserEventsInfo(request: any): Promise<any[]>;
    getUserInnerInvitesEventInfo(request: any): Promise<void>;
    getUserOuterInvitesEventInfo(request: any): Promise<void>;
    declineInnerInvite(request: any): Promise<any>;
}
