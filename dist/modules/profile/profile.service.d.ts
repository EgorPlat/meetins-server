import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/modules/users/users.service';
export declare class ProfileService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    getMyProfile(request: Request): Promise<void>;
    getProfileByLogin(login: any): Promise<void>;
}
