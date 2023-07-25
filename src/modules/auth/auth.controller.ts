import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcceptUserDto } from 'src/dto/accept-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: UserDto, @Res() res: Response) {
        return this.authService.login(userDto, res);
    }
    @Get('/logout')
    logout(@Res() res: Response) {
        return this.authService.logout(res);
    }
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
    @Post('/registrationWithConfirmation')
    registrationWithConfirmation(@Body() userDto: CreateUserDto) {
        return this.authService.registrationWithConfirmation(userDto);
    }
    @Post('/acceptUserAccount')
    acceptUserAccount(@Body() userDto: AcceptUserDto, @Res() res: Response) {
        return this.authService.acceptUserAccount(userDto, res);
    }
}
