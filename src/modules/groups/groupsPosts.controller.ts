import { Controller, Get, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { GroupsService } from './groupsPosts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FinallMulterOptions } from 'src/middlewares/fileSize.middleware';

@Controller('groups')
@ApiTags('Группы')
//@UseGuards(JwtAuthGuard)
export class GroupsController {

    constructor(private groupsService: GroupsService) {}

    @Get('/get-all-groups')
    getAllGroups(@Req() request: Request) {
        return this.groupsService.getAllGroups(request);
    }

    @Post('/get-group-by-id')
    getGroupById(@Req() request: Request) {
        return this.groupsService.getGroupById(request);
    }
    @Post('/get-group-members-info')
    getGroupMembersInfo(@Req() request: Request) {
        return this.groupsService.getGroupMembersInfo(request);
    }

    @Post('/create-new-group')
    createNewGroup(@Req() request: Request) {
        return this.groupsService.createNewGroup(request);
    }

    @Post('/create-new-post-in-group')
    @UseInterceptors(FilesInterceptor('media', 5, FinallMulterOptions))
    createNewPostInGroup(@UploadedFiles() files, @Req() request: Request) {
        return this.groupsService.createNewPostInGroup(files, request);
    }

    @Post('/create-new-talk-in-group')
    createNewTalkInGroup(@Req() request: Request) {
        return this.groupsService.createNewTalkInGroup(request);
    }
}
