import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { IMessage } from 'src/interfaces/chatMessage.interface';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/modules/users/users.service';
import { User } from 'src/schemas/user.schema';
import { AppGateway } from 'src/app.gateway';
export declare class ChatService {
    private userService;
    private helpJwtService;
    private chatModel;
    private socketServer;
    constructor(userService: UserService, helpJwtService: HelpJwtService, chatModel: Model<ChatDocument>, socketServer: AppGateway);
    getMyDialogs(inithiator: User): Promise<(Chat & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    addNewMessage(inithiator: User, dialogId: string, content: string, isFile: boolean): Promise<IMessage[]>;
    sendFileToChat(file: any, request: Request): Promise<void>;
    checkDialog(request: Request): Promise<void>;
    getDialogMessages(request: Request): Promise<void>;
    markDialogMessagesAsReaded(request: Request): Promise<void>;
    sendNewMessage(request: Request): Promise<void>;
    getUserDialogs(request: Request): Promise<void>;
    startNewDialog(request: Request): Promise<void>;
}
