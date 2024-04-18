import { ChatService } from './chat.service';
import { Request } from 'express';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    sendFileToChat(file: any, request: Request): Promise<void>;
    sendNewMessage(request: Request): Promise<void>;
    getDialogMessages(request: Request): Promise<void>;
    startNewDialog(request: Request): Promise<void>;
    getUserDialogs(request: Request): Promise<{
        dialogId: string;
        userName: string;
        userAvatar: string;
        isRead: boolean;
        content: string;
        messages: import("../../interfaces/chatMessage.interface").IMessage[];
        userLogin: number;
    }[]>;
    checkDialog(request: Request): Promise<any[]>;
    markDialogMessagesAsReaded(request: Request): Promise<{
        dialogId: string;
        userName: string;
        userAvatar: string;
        isRead: boolean;
        content: string;
        messages: import("../../interfaces/chatMessage.interface").IMessage[];
        userLogin: number;
    }[]>;
}
