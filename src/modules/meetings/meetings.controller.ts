import { Controller, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { MeetingsService } from './meetings.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('meetings')
@ApiTags('Встречи')
@UseGuards(JwtAuthGuard)

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

    @Post('/upload-media')
    @UseInterceptors(FileInterceptor('uploadedFile', {     
        storage: diskStorage(
            {
                destination: './src/static',
                filename: (req, file, cb) => {
                    const fileNameSplit = file.originalname.split('.');
                    const fileExt = fileNameSplit[fileNameSplit.length - 1];
                    cb(null, `${Date.now()}.${fileExt}`);
                }
            }
        )
        }))
    uploadMedia(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
        return this.meetingsService.uploadMedia(request, file);
    }

    @Put('/reg-in-meeting/:meetingId')
    regInMeetings(@Req() request: Request, @Param('meetingId') meetingId) {
        return this.meetingsService.regInMeetings(request, meetingId);
    }

    @Post('/send-comment')
    sendCommentAboutMeeting(@Req() request: Request) {
        return this.meetingsService.sendCommentAboutMeeting(request);
    }

    @Get('/places/:userId/')
    getUserPlaces(@Param() params: any, @Req() request: Request) {
        return this.meetingsService.getUserPlaces(request, params.userId); 
    }
}
