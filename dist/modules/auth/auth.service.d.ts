import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { UnConfirmedUserDocument } from 'src/schemas/unConfirmedUser.schema';
import { UserService } from 'src/modules/users/users.service';
import { Model } from 'mongoose';
import { MailService } from 'src/modules/mail/mail.service';
import { AcceptUserDto } from 'src/dto/accept-user.dto';
import { Response } from 'express';
export declare class AuthService {
    private userService;
    private jwtService;
    private mailService;
    private unConfirmedUserModel;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService, unConfirmedUserModel: Model<UnConfirmedUserDocument>);
    login(userDto: UserDto, response: Response): Promise<void>;
    logout(response: Response): Promise<void>;
    private generateToken;
    registration(userDto: CreateUserDto): Promise<void>;
    registrationWithConfirmation(userDto: CreateUserDto): Promise<void>;
    acceptUserAccount(acceptData: AcceptUserDto, response: Response): Promise<void>;
}
