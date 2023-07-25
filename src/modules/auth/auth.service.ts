import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { UnConfirmedUser, UnConfirmedUserDocument } from 'src/schemas/unConfirmedUser.schema';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/modules/users/users.service';
import { Model } from 'mongoose';
import { MailService } from 'src/modules/mail/mail.service';
import { AcceptUserDto } from 'src/dto/accept-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService, 
        private jwtService: JwtService,
        private mailService: MailService,
        @InjectModel(UnConfirmedUser.name) private unConfirmedUserModel: Model<UnConfirmedUserDocument>,
    ) {}

    async login(userDto: UserDto, response: Response) {
        const user = await this.userService.getUserByEmail(userDto.email);
        
        if(user) {
            const passwordEquals = user.password === userDto.password;
            if(passwordEquals && user.password) {
                const data = await this.generateToken(user);
                response.cookie('access_token', data.auth.token, { httpOnly: true, secure: true, sameSite: false });
                response.status(200).send(data);
            } else {
                throw new HttpException({message: 'Неккоректные данные. Пожалуйста попробуйте снова.'}, 400);
            }
        } else {
            throw new HttpException({message: 'Запрашиваемый пользователь не найден. Пожалуйста попробуйте снова.'}, 404);
        }
    }
    async logout(response: Response) {
        try {
            response.clearCookie('access_token'); 
        }
        catch (err) {
            console.log(err);
        }
        finally {
            response.status(200).send('Logged out'); 
        }
    }
    private async generateToken(user: User) {
        const payload = {   
            email: user.email, 
            name: user.name, 
            city: user.city, 
            avatar: user.avatar,
            userId: user.userId
        }
        return {
            auth: { token: this.jwtService.sign(payload, { expiresIn: '1h' }) },
            profile: { user }
        }
    }
    async registration(userDto: CreateUserDto) {
        const condidate = await this.userService.getUserByEmail(userDto.email);
        if(condidate) {
            throw new HttpException('Пользователь с таким email уже есть.', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.addUser(userDto);
        const userWithTokens = await this.generateToken(user);
        throw new HttpException(userWithTokens, 201);
    }

    // test
    async registrationWithConfirmation(userDto: CreateUserDto) {
        const findedUser = await this.userService.getUserByEmail(userDto.email);
        const createdUser = await this.unConfirmedUserModel.findOne({ email: userDto.email });
        if(findedUser || createdUser) {
            throw new HttpException('Пользователь с таким email уже есть.', HttpStatus.BAD_REQUEST);
        }
        const code = Math.floor(Math.random()*900000);
        let candidate = {
            ...userDto,
            actualCodeForConfirmation: code,
            login: Math.floor(Math.random()*20000),
            userId: "id" + String(Math.floor(Math.random()*100000))
        }
        const user = await this.unConfirmedUserModel.create(candidate);
        
        if (user) {
            await this.mailService.sendUserRegisterConfirmationMail(user.email, user.name, user.actualCodeForConfirmation);
            throw new HttpException('Success', 201);
        } else {
            throw new HttpException('Server error', 500);
        }
    }

    async acceptUserAccount(acceptData: AcceptUserDto, response: Response) {
        const unConfirmedUser = await this.unConfirmedUserModel.findOne({ email: acceptData.email });
        if (unConfirmedUser.actualCodeForConfirmation === acceptData.code) {
            const user = await this.userService.addUser({
                email: unConfirmedUser.email,
                name: unConfirmedUser.name,
                city: unConfirmedUser.city,
                gender: unConfirmedUser.gender,
                password: unConfirmedUser.password,
            });
            if (user) {
                const userWithTokens = await this.generateToken(user);
                await this.unConfirmedUserModel.deleteOne({ email: acceptData.email });
                response.cookie('access_token', userWithTokens.auth.token, { httpOnly: true, secure: false });
                response.status(200).send(userWithTokens);
            }
        } else {
            throw new HttpException('Неверный код', 400)
        }
    }
}
