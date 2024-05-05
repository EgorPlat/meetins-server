import { Controller, Get, Headers, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('profile')
@ApiTags('Профиль')
@UseGuards(JwtAuthGuard)

export class ProfileController {

    constructor(private profileService: ProfileService) {}

    @Get('/my-profile')
    getMyProfile(@Req() request: Request) {
        return this.profileService.getMyProfile(request);
    }
    @Get('/by-login/:login')
    getProfileByLogin(@Param('login') login) {
        return this.profileService.getProfileByLogin(login);
    }
}
