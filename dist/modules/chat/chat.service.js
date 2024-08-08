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
const appGateway_service_1 = require("../../appGateway/appGateway.service");
let ChatService = class ChatService {
    constructor(userService, helpJwtService, chatModel, socketServer) {
        this.userService = userService;
        this.helpJwtService = helpJwtService;
        this.chatModel = chatModel;
        this.socketServer = socketServer;
    }
    async getMyDialogs(userId) {
        let finalDialogs = await this.chatModel
            .find({ members: { $elemMatch: { $eq: userId } } })
            .sort({ "messages.sendAt": -1 });
        return finalDialogs;
    }
    async addNewMessage(inithiatorJwtData, dialogId, content, type) {
        const message = {
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
        };
        const currentChatState = await this.chatModel.findOneAndUpdate({ dialogId: message.dialogId }, { $push: { messages: message } }, { returnDocument: "after" });
        if (currentChatState) {
            const userSessionForSendingMessage = this.socketServer.getAppGateway().activeFullUsersList
                .filter(el => currentChatState.members.includes(el.userId))
                .map(el => el.socketId);
            if (userSessionForSendingMessage) {
                this.socketServer.getAppGateway().server.to([...userSessionForSendingMessage]).emit('message', message);
            }
        }
        return currentChatState.messages[currentChatState.messages.length - 1];
    }
    async sendFileToChat(file, request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        if (file.size > 5300000) {
            throw new common_1.HttpException({ message: "Слишком большой размер файла" }, 400);
        }
        else {
            const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, file.filename, file.mimetype);
            throw new common_1.HttpException(addedMessages, 200);
        }
    }
    async checkDialog(request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const inithiator = await this.userService.getUserByEmail(decodedJwt.email);
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
    async getDialogMessages(request) {
        const dialog = await this.chatModel.findOne({ dialogId: request.body.dialogId });
        const messages = dialog.messages;
        throw new common_1.HttpException(messages, 200);
    }
    async markDialogMessagesAsReaded(request) {
        const inithiator = this.helpJwtService.decodeJwt(request);
        const updatedDialogs = await this.getUserDialogs(request);
        if (updatedDialogs)
            return updatedDialogs;
        throw new common_1.HttpException('Что-то пошло не так', 400);
    }
    async sendNewMessage(request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const addedMessages = await this.addNewMessage(decodedJwt, request.body.dialogId, request.body.content, 'text');
        throw new common_1.HttpException(addedMessages, 200);
    }
    async getUserDialogs(request) {
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const dialogsData = this.chatModel.aggregate([
            {
                $match: { members: { $elemMatch: { $eq: decodedJwt === null || decodedJwt === void 0 ? void 0 : decodedJwt.userId } } }
            },
            {
                $sort: { "messages.sendAt": -1 }
            },
            {
                $unwind: "$members"
            },
            {
                $match: { members: { $ne: decodedJwt === null || decodedJwt === void 0 ? void 0 : decodedJwt.userId } }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "userId",
                    as: "members"
                }
            },
            {
                $unwind: "$members"
            },
            {
                $project: {
                    _id: 0,
                    dialogId: 1,
                    userName: "$members.name",
                    userAvatar: "$members.avatar",
                    isRead: true,
                    content: { $arrayElemAt: ["$messages.content", -1] },
                    messages: 1,
                    userLogin: "$members.login",
                    userId: "$members.userId"
                }
            }
        ]);
        if (dialogsData) {
            return dialogsData;
        }
        throw new common_1.HttpException("Что-то пошло не так.", 400);
    }
    async startNewDialog(request) {
        const createChatDto = request.body;
        const decodedJwt = await this.helpJwtService.decodeJwt(request);
        const newDialogId = String(Math.floor(Math.random() * 1000000));
        await this.chatModel.create({
            dialogId: "dialog" + newDialogId,
            messages: [],
            members: [decodedJwt.userId, createChatDto.userId]
        });
        const createdChat = await this.chatModel.findOne({ dialogId: "dialog" + newDialogId });
        const addedMessages = await this.addNewMessage(decodedJwt, createdChat.dialogId, createChatDto.messageContent, 'text');
        throw new common_1.HttpException(addedMessages, 200);
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [users_service_1.UserService,
        token_service_1.HelpJwtService,
        mongoose_2.Model,
        appGateway_service_1.AppGatewayService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map