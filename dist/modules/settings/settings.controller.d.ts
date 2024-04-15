import { SettingsService } from './settings.service';
import { Request } from 'express';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    updateUserAvatar(file: any, request: Request): Promise<void>;
    updateUserStatus(request: Request): Promise<void>;
    updateFilterStatus(request: Request): Promise<void>;
    updateUserAccount(request: Request): Promise<void>;
    updateUserProfile(request: Request): Promise<void>;
}
