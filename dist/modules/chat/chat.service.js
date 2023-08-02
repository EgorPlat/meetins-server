"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const token_service_1 = require("../../help/token.service");
const chat_schema_1 = require("../../schemas/chat.schema");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const app_gateway_1 = require("../../app.gateway");
let ChatService = class ChatService {
    constructor(userService, helpJwtService, chatModel, socketServer) {
        this.userService = userService;
        this.helpJwtService = helpJwtService;
        this.chatModel = chatModel;
        this.socketServer = socketServer;
    }
    async getMyDialogs(userId) {
        let finalDialogs = await this.chatModel
            .find({ $or: [{ firstUserId: userId }, { secondUserId: userId }] });
        finalDialogs.sort((prev, next) => {
            const prevLastMessageDate = new Date(prev.messages[prev.messages.length - 1].sendAt);
            const nextLastMessageDate = new Date(next.messages[next.messages.length - 1].sendAt);
            if (prevLastMessageDate < nextLastMessageDate) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return finalDialogs;
    }
    async addNewMessage(inithiatorJwtData, dialogId, content, isFile) {
        const message = {
            dialogId: dialogId,
            content: content,
            messageId: String(Math.floor(Math.random() * 5000000)),
            sendAt: String(new Date()),
            senderId: inithiatorJwtData.userId,
            isRead: false,
            avatar: inithiatorJwtData.avatar,
            senderName: inithiatorJwtData.name,
            status: false,
            isFile: isFile
        };
        await this.chatModel.updateOne({ dialogId: message.dialogId }, { $push: { messages: message } });
        const currentChatState = await this.chatModel.findOne({ dialogId: message.dialogId });
        const userSessionForSendingMessage = this.socketServer.activeFullUsersList
            .filter(el => el.userId === currentChatState.firstUserId || el.userId === currentChatState.secondUserId)
            .map(el => el.socketId);
        if (userSessionForSendingMessage) {
            this.socketServer.server.to([...userSessionForSendingMessage]).emit('message', message);
        }
        return currentChatState.messages[currentChatState.messages.length - 1];
    }
    async sendFileToChat(file, request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        if (file.size > 200000) {
            throw new common_1.HttpException({ message: "Слишком большой размер файла" }, 400);
        }
        else {
            const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, file.filename, true);
            throw new common_1.HttpException(addedMessages, 200);
        }
    }
    async checkDialog(request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const inithiator = await this.userService.getUserByEmail(decodedJwt.email);
        const dialogTry1 = await this.chatModel.find({ firstUserId: request.body.userId, secondUserId: inithiator.userId });
        const dialogTry2 = await this.chatModel.find({ secondUserId: request.body.userId, firstUserId: inithiator.userId });
        if (dialogTry1.length !== 0) {
            throw new common_1.HttpException(dialogTry1, 200);
        }
        if (dialogTry2.length !== 0) {
            throw new common_1.HttpException(dialogTry2, 200);
        }
        throw new common_1.HttpException('Ничего не найдено по данному запросу.', 404);
    }
    async getDialogMessages(request) {
        const dialog = await this.chatModel.findOne({ dialogId: request.body.dialogId });
        const messages = dialog.messages;
        throw new common_1.HttpException(messages, 200);
    }
    async markDialogMessagesAsReaded(request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const inithiator = await this.userService.getUserByEmail(decodedJwt.email);
        const dialog = await this.chatModel.findOne({ dialogId: request.body.dialogId });
        const updatedDialogMessages = dialog.messages.map((message) => {
            if (message.senderId !== inithiator.userId) {
                return Object.assign(Object.assign({}, message), { isRead: true });
            }
            return message;
        });
        await this.chatModel.updateOne({ dialogId: request.body.dialogId }, {
            $set: {
                messages: updatedDialogMessages
            }
        });
        throw new common_1.HttpException('Success', 200);
    }
    async sendNewMessage(request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, request.body.content, false);
        throw new common_1.HttpException(addedMessages, 200);
    }
    async getUserDialogs(request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const findedDialogs = await this.getMyDialogs(decodedJwt.userId);
        const shortDialogsForUser = await Promise.all(findedDialogs.map(async (eachDialog) => {
            const firstUser = await this.userService.getUserByUserId(eachDialog.firstUserId);
            const secondUser = await this.userService.getUserByUserId(eachDialog.secondUserId);
            if (decodedJwt.userId === eachDialog.firstUserId) {
                return {
                    dialogId: eachDialog.dialogId,
                    userName: secondUser.name,
                    userAvatar: secondUser.avatar,
                    isRead: true,
                    content: eachDialog.messages[0].content,
                    messages: eachDialog.messages
                };
            }
            else {
                return {
                    dialogId: eachDialog.dialogId,
                    userName: firstUser.name,
                    userAvatar: firstUser.avatar,
                    isRead: true,
                    content: eachDialog.messages[0].content,
                    messages: eachDialog.messages
                };
            }
        }));
        throw new common_1.HttpException(shortDialogsForUser, 200);
    }
    async startNewDialog(request) {
        const createChatDto = request.body;
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const newDialogId = String(Math.floor(Math.random() * 1000000));
        await this.chatModel.create({
            dialogId: "dialog" + newDialogId,
            messages: [],
            firstUserId: decodedJwt.userId,
            secondUserId: createChatDto.userId
        });
        const createdChat = await this.chatModel.findOne({ dialogId: "dialog" + newDialogId });
        const addedMessages = await this.addNewMessage(decodedJwt, createdChat.dialogId, createChatDto.messageContent, false);
        throw new common_1.HttpException(addedMessages, 200);
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [users_service_1.UserService,
        token_service_1.HelpJwtService,
        mongoose_2.Model,
        app_gateway_1.AppGateway])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map