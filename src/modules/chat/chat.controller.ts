import { BadRequestException, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { FinallMulterOptions } from 'src/middlewares/fileSize.middleware';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {}

    @Post('/send-file-to-chat')
    @UseInterceptors(FileInterceptor('uploadedFile', FinallMulterOptions))
    sendFileToChat(@UploadedFile() file, @Req() request: Request) {
        return this.chatService.sendFileToChat(file, request);
    }
    @Post('/send-message')
    sendNewMessage(@Req() request: Request) {
        return this.chatService.sendNewMessage(request);
    }
    @Post('/messages')
    getDialogMessages(@Req() request: Request) {
        return this.chatService.getDialogMessages(request);
    }
    @Post('/start-dialog')
    startNewDialog(@Req() request: Request) {
        return this.chatService.startNewDialog(request);
    }
    @Get('/my-dialogs')
    getUserDialogs(@Req() request: Request) {
        return this.chatService.getUserDialogs(request);
    }
    @Post('/check-dialog')
    checkDialog(@Req() request: Request) {
        return this.chatService.checkDialog(request);
    }
    @Post('/mark-messages-as-readed')
    markDialogMessagesAsReaded(@Req() request: Request) {
        return this.chatService.markDialogMessagesAsReaded(request);
    }
}
