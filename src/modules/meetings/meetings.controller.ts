import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { MeetingsService } from './meetings.service';

@Controller('meetings')
@ApiTags('Встречи')
//@UseGuards(JwtAuthGuard)
export class MeetingsController {

    constructor(private meetingsService: MeetingsService) {}

    @Get('/get-all-meetings')
    getAllMeetings() {
        return this.meetingsService.getAllMeetings();
    }

    @Post('/create-meeting')
    createNewMeeting(@Req() request: Request) {
        return this.meetingsService.createNewMeeting(request);
    }
}
