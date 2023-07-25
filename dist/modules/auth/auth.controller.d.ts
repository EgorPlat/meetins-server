import { AcceptUserDto } from 'src/dto/accept-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: UserDto, res: Response): Promise<void>;
    logout(res: Response): Promise<void>;
    registration(userDto: CreateUserDto): Promise<void>;
    registrationWithConfirmation(userDto: CreateUserDto): Promise<void>;
    acceptUserAccount(userDto: AcceptUserDto, res: Response): Promise<void>;
}
