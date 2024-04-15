import { Controller, Get, Param, Post, Put, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { GroupsService } from './groupsPosts.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FinallMulterOptions } from 'src/middlewares/fileSize.middleware';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('groups')
@ApiTags('Группы')
@UseGuards(JwtAuthGuard)

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

    @Post('/join-to-group')
    joinToGroup(@Req() request: Request) {
        return this.groupsService.joinToGroup(request);
    }

    @Post('/manage-group-by-id')
    @UseInterceptors(FileInterceptor('headImage', FinallMulterOptions))
    manageGroupByid(@UploadedFile() file, @Req() request: Request) {
        return this.groupsService.manageGroupByid(file, request);
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

    @Post('/create-new-message-in-group-talk')
    createNewMessageInGroupTalk(@Req() request: Request) {
        return this.groupsService.createNewMessageInGroupTalk(request);
    }

    @Post('/get-group-talks-by-id')
    getGroupTalksList(@Req() request: Request) {
        return this.groupsService.getGroupTalksList(request);
    }

    @Post('/get-group-talk-messages-by-id')
    getTalkMessagesInGroupById(@Req() request: Request) {
        return this.groupsService.getTalkMessagesInGroupById(request);
    }
    
    @Post('/add-new-comment-into-post/:groupId/:postId')
    addNewCommentIntoPost(@Param() params: any, @Req() request: Request) {
        return this.groupsService.addNewCommentIntoPost(request, params.groupId, params.postId);
    }

    @Put('/like/:groupId/:postId')
    likePostInGroup(@Param() params: any, @Req() request: Request) {
        return this.groupsService.likePostInGroup(request, params.groupId, params.postId);
    }

    @Put('/unlike/:groupId/:postId')
    unlikePostInGroup(@Param() params: any, @Req() request: Request) {
        return this.groupsService.unlikePostInGroup(request, params.groupId, params.postId);
    }
}
