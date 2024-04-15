import { Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { MusicService } from './music.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FinallMulterOptions } from 'src/middlewares/fileSize.middleware';

@Controller('music')
@ApiTags('Музыка')
@UseGuards(JwtAuthGuard)

export class MusicController {

    constructor(private musicService: MusicService) {}

    @Get('/getAll')
    getAllMusic(@Req() request: Request) {
        return this.musicService.getAllMusic();
    }

    @Get('/statistic')
    getAuthorsStatistics(@Req() request: Request) {
        return this.musicService.getAuthorsStatistics();
    }

    @Get('/mine-statistic')
    getAuthorStatistics(@Req() request: Request) {
        return this.musicService.getAuthorStatistics(request);
    }

    @Post('/add')
    @UseInterceptors(FilesInterceptor('media', 2 , FinallMulterOptions))
    addMusic(@UploadedFiles() files, @Req() request: Request) {
        return this.musicService.addMusic(files, request);
    }

    @Post('/plays/:authorId/:trackId')
    addPlaysNumber(@Param() params: any, @Req() request: Request) {
        return this.musicService.addPlaysNumber(request, params.authorId, params.trackId);
    }

    @Get('/matches')
    getMatchesList(@Req() request: Request) {
        return this.musicService.getMatchesList(request);
    }

    @Get('/getAuthorCurrentName')
    getAuthorCurrentName(@Req() request: Request) {
        return this.musicService.getAuthorCurrentName(request);
    }
}
