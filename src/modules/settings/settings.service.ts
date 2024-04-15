import { HttpException, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import {Request} from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/users.service';
import { HelpJwtService } from 'src/help/token.service';



@Injectable()
export class SettingsService {

    constructor(private userService: UserService, private jwtService: JwtService, private helpJwtService: HelpJwtService) {}

    async updateUserAvatar(file: any, request: Request) {
        const decodedToken = await this.helpJwtService.decodeJwt(request);
        const user = await this.userService.getUserByEmail(decodedToken.email);

        const updatedUser = await this.userService.updateUserAvatar(file, user);
        throw new HttpException(updatedUser, 200);
    }
    async updateUserStatus(request: Request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);

        const updatedUser = await this.userService.updateUserStatus(decodedToken, request.body.status);
        throw new HttpException(updatedUser, 200);
    }
    async updateUserAccount(request: Request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);

        const updatedUser = await this.userService.updateUserAccount(decodedToken, request.body);
        throw new HttpException(updatedUser, 200);
    }
    async updateFilterStatus(request: Request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);

        const updatedUser = await this.userService.updateUserFilterStatus(decodedToken, request.body.isFilter);
        throw new HttpException(updatedUser, 200);
    }
    async updateUserProfile(request: Request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);

        const updatedUser = await this.userService.updateUserProfile(decodedToken, request.body);
        throw new HttpException(updatedUser, 200);
    }
}
