import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { IMessage } from 'src/interfaces/chatMessage.interface';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/modules/users/users.service';
import { DecodedJwt } from 'src/interfaces/decodedJwt';
import { AppGatewayService } from 'src/appGateway/appGateway.service';
export declare class ChatService {
    private userService;
    private helpJwtService;
    private chatModel;
    private socketServer;
    constructor(userService: UserService, helpJwtService: HelpJwtService, chatModel: Model<ChatDocument>, socketServer: AppGatewayService);
    getMyDialogs(userId: string): Promise<(Chat & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    addNewMessage(inithiatorJwtData: DecodedJwt, dialogId: string, content: string, type: string): Promise<IMessage>;
    sendFileToChat(file: any, request: Request): Promise<void>;
    checkDialog(request: Request): Promise<any[]>;
    getDialogMessages(request: Request): Promise<void>;
    markDialogMessagesAsReaded(request: Request): Promise<any[]>;
    sendNewMessage(request: Request): Promise<void>;
    getUserDialogs(request: Request): Promise<any[]>;
    startNewDialog(request: Request): Promise<void>;
}
