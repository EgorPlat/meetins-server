import { ChatService } from './chat.service';
import { Request } from 'express';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    updateUserAvatar(file: any, request: Request): Promise<void>;
    sendNewMessage(request: Request): Promise<void>;
    getDialogMessages(request: Request): Promise<void>;
    startNewDialog(request: Request): Promise<void>;
    getUserDialogs(request: Request): Promise<void>;
    checkDialog(request: Request): Promise<void>;
    markDialogMessagesAsReaded(request: Request): Promise<void>;
}
