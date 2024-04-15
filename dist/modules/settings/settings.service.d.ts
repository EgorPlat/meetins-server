import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/users.service';
import { HelpJwtService } from 'src/help/token.service';
export declare class SettingsService {
    private userService;
    private jwtService;
    private helpJwtService;
    constructor(userService: UserService, jwtService: JwtService, helpJwtService: HelpJwtService);
    updateUserAvatar(file: any, request: Request): Promise<void>;
    updateUserStatus(request: Request): Promise<void>;
    updateUserAccount(request: Request): Promise<void>;
    updateFilterStatus(request: Request): Promise<void>;
    updateUserProfile(request: Request): Promise<void>;
}
