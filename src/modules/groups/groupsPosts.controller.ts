import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { GroupsService } from './groupsPosts.service';

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
}
