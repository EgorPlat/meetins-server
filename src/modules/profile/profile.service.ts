import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppGateway } from 'src/app.gateway';
import { UserService } from 'src/modules/users/users.service';

@Injectable()
export class ProfileService {

    constructor(
        private jwtService: JwtService, 
        private userService: UserService,
        private socketServer: AppGateway
    ) {}
    
    async getMyProfile(request: Request) {
        //const BearerToken: any = request.headers.authorization;
        //const token = BearerToken.split(' ')[1];
        const token = request.cookies['access_token'];
        const decodedToken: any = this.jwtService.decode(token);
        const user = await this.userService.getUserByEmail(decodedToken.email);
        
        if(user) {
            throw new HttpException(user, 200)
        } else {
            throw new HttpException('Ошибка. Обновите токен.', HttpStatus.UNAUTHORIZED);
        }
    }
    async getProfileByLogin(login) {
        const user = await this.userService.getUserByLogin(login);
        if(user) {
            throw new HttpException(user, 200)
        } else {
            throw new HttpException('Ошибка. Пользователь не найден.', HttpStatus.NOT_FOUND);
        }
    }
}
