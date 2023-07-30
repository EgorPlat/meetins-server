import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { Request } from '@nestjs/common';
@Controller('event')
export class EventController {

    constructor(private eventService: EventService) {}

    @Post('/getEventsCategory')
    getEventsByCategory(@Request() request) {
        return this.eventService.getEventsByCategory(request.body)
    }
    @Post('/getEventInfoById')
    getEventInfoById(@Request() request) {
        return this.eventService.getEventInfoById(request.body.eventId)
    }
    @Post('/getCommentsForEventById')
    getCommentsForEventById(@Request() request) {
        return this.eventService.getCommentsForEventById(request.body.eventId)
    }
    @Post('/sendInviteToUser')
    sendInviteToUser(@Request() request) {
        return this.eventService.sendInviteToUser(request)
    }
    @Get('/getUserEventsInfo')
    getUserEventsInfo(@Request() request) {
        return this.eventService.getUserEventsInfo(request)
    }
    @Get('/getUserInnerInvitesEventInfo')
    getUserInnerInvitesEventInfo(@Request() request) {
        return this.eventService.getUserInnerInvitesEventInfo(request)
    }
    @Get('/getUserOuterInvitesEventInfo')
    getUserOuterInvitesEventInfo(@Request() request) {
        return this.eventService.getUserOuterInvitesEventInfo(request)
    }
}
