import { Body, Controller, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SettingsService } from './settings.service';
import {Request} from 'express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FinallMulterOptions } from 'src/middlewares/fileSize.middleware';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {

    constructor(private settingsService: SettingsService) {}
    @Post('/update-avatar')
    @UseInterceptors(FileInterceptor('uploadedFile', FinallMulterOptions))
    updateUserAvatar(@UploadedFile() file, @Req() request: Request) {
        return this.settingsService.updateUserAvatar(file, request);
    }

    @Post('/update-status')
    updateUserStatus(@Req() request: Request) {
        return this.settingsService.updateUserStatus(request);
    }
    @Post('/update-filter-status')
    updateFilterStatus(@Req() request: Request) {
        return this.settingsService.updateFilterStatus(request);
    }
    @Post('/update-account')
    updateUserAccount(@Req() request: Request) {
        return this.settingsService.updateUserAccount(request);
    }
    @Post('/update-profile')
    updateUserProfile(@Req() request: Request) {
        return this.settingsService.updateUserProfile(request);
    }
}
