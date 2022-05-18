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
    @Get('/getEventInfoById')
    getEventInfoById(@Request() request) {
        return this.eventService.getEventInfoById(request.body)
    }
}
