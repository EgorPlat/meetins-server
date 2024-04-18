import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, response } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { IMessage } from 'src/interfaces/chatMessage.interface';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/modules/users/users.service';
import { CreateChatDto } from 'src/dto/create-chat.dto';
import { User } from 'src/schemas/user.schema';
import { AppGateway } from 'src/app.gateway';
import { DecodedJwt } from 'src/interfaces/decodedJwt';

@Injectable()
export class ChatService {

    constructor(
        private userService: UserService,
        private helpJwtService: HelpJwtService,
        @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
        private socketServer: AppGateway
    ) { }

    async getMyDialogs(userId: string) {
        let finalDialogs = await this.chatModel
        .find({ members: { $elemMatch: { $eq: userId } } })
        .sort({ "messages.sendAt": -1 });
        return finalDialogs;
    }

    async addNewMessage(
        inithiatorJwtData: DecodedJwt, 
        dialogId: string, 
        content: string, 
        type: string
    ) {
        const message: IMessage = {
            dialogId: dialogId,
            content: content,
            messageId: String(Math.floor(Math.random() * 5000000)),
            sendAt: new Date(),
            senderId: inithiatorJwtData.userId,
            isRead: false,
            avatar: inithiatorJwtData.avatar,
            senderName: inithiatorJwtData.name,
            status: false,
            type: type
        }
        await this.chatModel.updateOne({ dialogId: message.dialogId }, { $push: { messages: message } } );
        const currentChatState = await this.chatModel.findOne({ dialogId: message.dialogId });

        if (currentChatState) {
            const userSessionForSendingMessage = this.socketServer.activeFullUsersList
            .filter(el => currentChatState.members.includes(el.userId))
            .map(el => el.socketId);

            if (userSessionForSendingMessage) {
                this.socketServer.server.to([...userSessionForSendingMessage]).emit('message', message);
            }
        }
        return currentChatState.messages[currentChatState.messages.length - 1];
    }
    // Все обработчики роутов ниже, а вверху вспомогательные функции
    async sendFileToChat(file: any, request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        if (file.size > 5300000) {
            throw new HttpException({ message: "Слишком большой размер файла"}, 400); 
        } else {
            const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, file.filename, file.mimetype);
            throw new HttpException(addedMessages, 200);
        }
    }

    async checkDialog(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const inithiator: User = await this.userService.getUserByEmail(decodedJwt.email);

        let dialogInfo = await this.chatModel.aggregate([
            { 
                $match: {
                    members: {
                        $all: [inithiator.userId, request.body.userId],
                        $size: 2
                    }
                }
            }
        ]);
        if (dialogInfo) {
            return dialogInfo;
        }
    }

    async getDialogMessages(request: Request) {
        const dialog: Chat = await this.chatModel.findOne({ dialogId: request.body.dialogId });
        const messages = dialog.messages;
        throw new HttpException(messages, 200);
    }

    async markDialogMessagesAsReaded(request: Request) {
        await this.chatModel.updateOne({ dialogId: request.body.dialogId }, {
            $set: { "messages.$[].isRead": true }
        }, { multi: true });
        const updatedDialogs = await this.getUserDialogs(request);

        if (updatedDialogs) return updatedDialogs;
        throw new HttpException('Что-то пошло не так', 400);
    }

    async sendNewMessage(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, request.body.content, 'text');
        throw new HttpException(addedMessages, 200);
    }
    
    async getUserDialogs(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const findedDialogs = await this.getMyDialogs(decodedJwt?.userId);
        const requestedUser: User = await this.userService.getUserByUserId(decodedJwt.userId);

        const shortDialogsForUser = await Promise.all(findedDialogs.map(async (eachDialog) => {
            const userChatId = eachDialog.members.filter(memberId => memberId !== requestedUser.userId);
            const userChatIdInfo: User = await this.userService.getUserByUserId(userChatId[userChatId.length-1]);
            return {
                dialogId: eachDialog.dialogId,
                userName: userChatIdInfo.name,
                userAvatar: userChatIdInfo.avatar,
                isRead: true,
                content: eachDialog.messages[0].content,
                messages: eachDialog.messages,
                userLogin: userChatIdInfo.login
            }
        }))

        if (shortDialogsForUser) {
            return shortDialogsForUser;
        }
        throw new HttpException("Что-то пошло не так.", 400);
    }

    async startNewDialog(request: Request) {
        const createChatDto: CreateChatDto = request.body;
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        
        const newDialogId: string = String(Math.floor(Math.random() * 1000000));
        await this.chatModel.create({ 
            dialogId: "dialog" + newDialogId, 
            messages: [],
            members: [decodedJwt.userId, createChatDto.userId]
        });

        const createdChat = await this.chatModel.findOne({ dialogId: "dialog" + newDialogId });
        const addedMessages = await this.addNewMessage(decodedJwt, createdChat.dialogId, createChatDto.messageContent, 'text');
        
        throw new HttpException(addedMessages, 200);
    }
}
