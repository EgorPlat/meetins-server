import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
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
        .find({ $or: [{ firstUserId: userId }, { secondUserId: userId }] })
        .sort({ "messages.sendAt": -1 });
        return finalDialogs;
    }

    async addNewMessage(inithiatorJwtData: DecodedJwt, dialogId: string, content: string, isFile: boolean) {
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
            isFile: isFile
        }
        await this.chatModel.updateOne({ dialogId: message.dialogId }, { $push: { messages: message } } );
        const currentChatState = await this.chatModel.findOne({ dialogId: message.dialogId });

        const userSessionForSendingMessage = this.socketServer.activeFullUsersList
        .filter(el => el.userId === currentChatState.firstUserId || el.userId === currentChatState.secondUserId)
        .map(el => el.socketId);

        if (userSessionForSendingMessage) {
            this.socketServer.server.to([...userSessionForSendingMessage]).emit('message', message);
        }
        return currentChatState.messages[currentChatState.messages.length - 1];
    }
    // Все обработчики роутов ниже, а вверху вспомогательные функции
    async sendFileToChat(file: any, request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        if (file.size > 200000) {
            throw new HttpException({ message: "Слишком большой размер файла"}, 400); 
        } else {
            const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, file.filename, true);
            throw new HttpException(addedMessages, 200);
        }
    }

    async checkDialog(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const inithiator: User = await this.userService.getUserByEmail(decodedJwt.email);

        const dialogTry1: Chat[] = await this.chatModel.find({ firstUserId: request.body.userId, secondUserId: inithiator.userId });
        const dialogTry2: Chat[] = await this.chatModel.find({ secondUserId: request.body.userId, firstUserId: inithiator.userId });

        if (dialogTry1.length !== 0) {
            throw new HttpException(dialogTry1, 200);
        }
        if (dialogTry2.length !== 0) {
            throw new HttpException(dialogTry2, 200);
        }
        throw new HttpException('Ничего не найдено по данному запросу.', 404);
    }

    async getDialogMessages(request: Request) {
        const dialog: Chat = await this.chatModel.findOne({ dialogId: request.body.dialogId });
        const messages = dialog.messages;
        throw new HttpException(messages, 200);
    }

    async markDialogMessagesAsReaded(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const dialog: Chat = await this.chatModel.findOne({ dialogId: request.body.dialogId });

        const updatedDialogMessages = dialog.messages.map((message) => {
            if (message.senderId !== decodedJwt.userId) {
                return {
                    ...message,
                    isRead: true,
                }
            }
            return message;
        })
        await this.chatModel.updateOne({ dialogId: request.body.dialogId }, {
            $set: {
                messages: updatedDialogMessages
            }
        });
        throw new HttpException('Success', 200);
    }

    async sendNewMessage(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, request.body.content, false);
        throw new HttpException(addedMessages, 200);
    }
    
    async getUserDialogs(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const findedDialogs = await this.getMyDialogs(decodedJwt.userId);
        const requestedUser: User = await this.userService.getUserByUserId(decodedJwt.userId);

        const shortDialogsForUser = await Promise.all(findedDialogs.map(async (eachDialog) => {
            if (requestedUser.userId === eachDialog.firstUserId) {
                const userInDialog: User = await this.userService.getUserByUserId(eachDialog.secondUserId)
                return {
                    dialogId: eachDialog.dialogId,
                    userName: userInDialog.name,
                    userAvatar: userInDialog.avatar,
                    isRead: true,
                    content: eachDialog.messages[0].content,
                    messages: eachDialog.messages
                }
            } else {
                const userInDialog: User = await this.userService.getUserByUserId(eachDialog.firstUserId)
                return {
                    dialogId: eachDialog.dialogId,
                    userName: userInDialog.name,
                    userAvatar: userInDialog.avatar,
                    isRead: true,
                    content: eachDialog.messages[0].content,
                    messages: eachDialog.messages
                }
            }
        }))

        throw new HttpException(shortDialogsForUser, 200);
    }

    async startNewDialog(request: Request) {
        const createChatDto: CreateChatDto = request.body;
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        
        const newDialogId: string = String(Math.floor(Math.random() * 1000000));
        await this.chatModel.create({ 
            dialogId: "dialog" + newDialogId, 
            messages: [], 
            firstUserId: decodedJwt.userId, 
            secondUserId: createChatDto.userId 
        });

        const createdChat = await this.chatModel.findOne({ dialogId: "dialog" + newDialogId });
        const addedMessages = await this.addNewMessage(decodedJwt, createdChat.dialogId, createChatDto.messageContent, false);
        
        throw new HttpException(addedMessages, 200);
    }
}
