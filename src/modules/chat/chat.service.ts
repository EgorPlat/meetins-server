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

@Injectable()
export class ChatService {

    constructor(
        private userService: UserService,
        private helpJwtService: HelpJwtService,
        @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
        private socketServer: AppGateway
    ) { }

    async getMyDialogs(inithiator: User) {
        let myDialogs1 = await this.chatModel.find({ firstUserId: inithiator.userId });
        let myDialogs2 = await this.chatModel.find({ secondUserId: inithiator.userId });
        let finalDialogs = [...myDialogs1, ...myDialogs2];

        finalDialogs.sort((prev, next) => {
            const prevLastMessageDate = new Date (prev.messages[prev.messages.length - 1].sendAt);
            const nextLastMessageDate = new Date (next.messages[next.messages.length - 1].sendAt);
            if (prevLastMessageDate < nextLastMessageDate) {
                return 1;
            } else {
                return -1;
            }
        })
        return finalDialogs;
    }

    async addNewMessage(inithiator: User, dialogId: string, content: string, isFile: boolean) {
        const message: IMessage = {
            dialogId: dialogId,
            content: content,
            messageId: String(Math.floor(Math.random() * 5000000)),
            sendAt: String(new Date()),
            senderId: inithiator.userId,
            isRead: false,
            avatar: inithiator.avatar,
            senderName: inithiator.name,
            status: false,
            isFile: isFile
        }
        const prevChatState = await this.chatModel.findOne({ dialogId: message.dialogId });
        await this.chatModel.updateOne({ dialogId: message.dialogId }, {
            $set: {
                messages: [...prevChatState.messages, message]
            }
        });
        const currentChatState = await this.chatModel.findOne({ dialogId: message.dialogId });

        const userOne = await this.userService.getUserByUserId(currentChatState.firstUserId);
        const userTwo = await this.userService.getUserByUserId(currentChatState.secondUserId);
        const userOneSocketData = this.socketServer.activeFullUsersList.filter(el => el.email === userOne.email).map(el => el.socketId);
        const userTwoSocketData = this.socketServer.activeFullUsersList.filter(el => el.email === userTwo.email).map(el => el.socketId);
        
        if (userOneSocketData) {
            this.socketServer.server.to([...userOneSocketData]).emit('message', { dialogId: message.dialogId });
        }
        if (userTwoSocketData) {
            this.socketServer.server.to([...userTwoSocketData]).emit('message', { dialogId: message.dialogId });
        }
        return currentChatState.messages;
    }
    // Все обработчики роутов ниже, а вверху вспомогательные функции
    async sendFileToChat(file: any, request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const inithiator: User = await this.userService.getUserByEmail(decodedJwt.email);

        const updatedMessages = await this.addNewMessage(inithiator, request.body.dialogId, file.filename, true);
        throw new HttpException(updatedMessages, 200);
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
        const inithiator: User = await this.userService.getUserByEmail(decodedJwt.email);
        const dialog: Chat = await this.chatModel.findOne({ dialogId: request.body.dialogId });

        const updatedDialogMessages = dialog.messages.map((message) => {
            if (message.senderId !== inithiator.userId) {
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
        const inithiator: User = await this.userService.getUserByEmail(decodedJwt.email);
        const updatedMessages = await this.addNewMessage(inithiator, request.body.dialogId, request.body.content, false);
        throw new HttpException(updatedMessages, 200);
    }
    
    async getUserDialogs(request: Request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const inithiator: User = await this.userService.getUserByEmail(decodedJwt.email);
        const findedDialogs = await this.getMyDialogs(inithiator);

        const shortDialogsForUser = await Promise.all(findedDialogs.map(async (eachDialog) => {
            const firstUser: User = await this.userService.getUserByUserId(eachDialog.firstUserId)
            const secondUser: User = await this.userService.getUserByUserId(eachDialog.secondUserId)
            if (inithiator.userId === eachDialog.firstUserId) {
                return {
                    dialogId: eachDialog.dialogId,
                    userName: secondUser.name,
                    userAvatar: secondUser.avatar,
                    isRead: true,
                    content: eachDialog.messages[0].content,
                    messages: eachDialog.messages
                }
            } else {
                return {
                    dialogId: eachDialog.dialogId,
                    userName: firstUser.name,
                    userAvatar: firstUser.avatar,
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
        const inithiator: User = await this.userService.getUserByEmail(decodedJwt.email);

        const newDialogId: string = String(Math.floor(Math.random() * 1000000));
        await this.chatModel.create({ 
            dialogId: "dialog" + newDialogId, 
            messages: [], 
            firstUserId: inithiator.userId, 
            secondUserId: createChatDto.userId 
        });

        const createdChat = await this.chatModel.findOne({ dialogId: "dialog" + newDialogId });
        const updatedMessages = await this.addNewMessage(inithiator, createdChat.dialogId, createChatDto.messageContent, false);
        
        throw new HttpException(updatedMessages, 200);
    }
}
