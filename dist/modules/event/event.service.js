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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const ckeck_service_1 = require("../../help/ckeck.service");
const token_service_1 = require("../../help/token.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
let EventService = class EventService {
    constructor(httpService, checkService, jwtHelpService, userService, mailService, userModel) {
        this.httpService = httpService;
        this.checkService = checkService;
        this.jwtHelpService = jwtHelpService;
        this.userService = userService;
        this.mailService = mailService;
        this.userModel = userModel;
    }
    async getUserOuterInvitesEventInfo(request) {
        const decodedJwt = this.jwtHelpService.decodeJwt(request);
        const user = await this.userService.getUserByEmail(decodedJwt.email);
        let userEventsInfo = [];
        if (user) {
            await Promise.all(user.outerInvites.map(async (inviteInfo) => {
                const { data } = await this.httpService.get(`https://kudago.com/public-api/v1.4/events/${inviteInfo.eventId}`).toPromise();
                const neededUsersId = inviteInfo.invitedUsers.map(el => el.userId);
                const invitedUsers = await this.userModel.find({ userId: { $in: neededUsersId } }, { name: 1, avatar: 1, login: 1 });
                if (data) {
                    return Object.assign(Object.assign({}, data), { isInnerInvite: false, inviteInfo: Object.assign(Object.assign({}, inviteInfo), { invitedUsers: invitedUsers.map(el => {
                                return { avatar: el.avatar, name: el.name, login: el.login };
                            }) }) });
                }
                else {
                    return null;
                }
            })).then(results => {
                userEventsInfo = results.filter(el => el !== null);
            });
        }
        throw new common_1.HttpException(userEventsInfo, 200);
    }
    async getUserInnerInvitesEventInfo(request) {
        const decodedJwt = this.jwtHelpService.decodeJwt(request);
        const user = await this.userModel.findOne({ email: decodedJwt.email }, {
            _id: false,
            __v: false
        });
        let userEventsInfo = [];
        if (user) {
            await Promise.all(user.innerInvites.map(async (inviteInfo) => {
                const { data } = await this.httpService.get(`https://kudago.com/public-api/v1.4/events/${inviteInfo.eventId}`).toPromise();
                const inviteUser = await this.userModel.findOne({ userId: inviteInfo.fromUserId }, { avatar: 1, login: 1, name: 1 });
                if (data) {
                    return Object.assign(Object.assign({}, data), { isInnerInvite: true, inviteInfo: Object.assign(Object.assign({}, inviteInfo), { avatar: inviteUser.avatar, login: inviteUser.login, name: inviteUser.name }) });
                }
                else {
                    return null;
                }
            })).then(results => {
                userEventsInfo = [...userEventsInfo, ...results.filter(el => el !== null)];
            });
        }
        throw new common_1.HttpException(userEventsInfo, 200);
    }
    async getUserEventsInfo(request) {
        const decodedJwt = this.jwtHelpService.decodeJwt(request);
        const user = await this.userModel.findOne({ email: decodedJwt.email }, {
            _id: false,
            __v: false
        });
        let userEventsInfo = [];
        if (user) {
            await Promise.all(user.events.map(async (eventId) => {
                const { data } = await this.httpService.get(`https://kudago.com/public-api/v1.4/events/${eventId}`).toPromise();
                if (data) {
                    return data;
                }
                else {
                    return null;
                }
            })).then(results => {
                userEventsInfo = results.filter(el => el !== null);
            });
        }
        throw new common_1.HttpException(userEventsInfo, 200);
    }
    async getEventsByCategory(eventsInfo) {
        const dateInTimestamp = Math.floor(Date.now() / 1000);
        const { data } = await this.httpService.get(`https://kudago.com/public-api/v1.4/events/?page=${eventsInfo.page}&page_size=70&categories=${eventsInfo.nameCategory}&fields=id,title,description,price,images,location,dates,age_restriction&actual_since=${dateInTimestamp - 50000}`).toPromise();
        if (data) {
            return data.results;
        }
        else {
            throw new common_1.HttpException('Ничего не найдено', 404);
        }
    }
    async getEventInfoById(eventId) {
        const { data } = await this.httpService.get(`https://kudago.com/public-api/v1.4/events/${eventId}`).toPromise();
        if (data) {
            return data;
        }
        else {
            throw new common_1.HttpException('Ничего не найдено', 404);
        }
    }
    async getCommentsForEventById(eventId) {
        const { data } = await this.httpService.get(`https://kudago.com/public-api/v1.2/events/${eventId}/comments/`).toPromise();
        if (data) {
            return data.results.slice(0, 30);
        }
        else {
            throw new common_1.HttpException('Ничего не найдено', 404);
        }
    }
    async sendInviteToUser(request) {
        try {
            const decodedJwt = await this.jwtHelpService.decodeJwt(request);
            const { userIdTo, eventId } = request.body;
            const dateOfSending = new Date();
            const userFromData = await this.userService.getUserByEmail(decodedJwt.email);
            const userToData = await this.userService.getUserByUserId(userIdTo);
            await this.mailService.sendUserConfirmation(userToData.email, userToData.name);
            let eventSearched = false;
            let updatedOuterInvites = userFromData.outerInvites.map(el => {
                if (el.eventId === eventId) {
                    eventSearched = true;
                    const userAlreadyInList = el.invitedUsers.filter(user => user.userId === userIdTo).length !== 0;
                    if (userAlreadyInList) {
                        throw new common_1.HttpException('User is already in invited list', 500);
                    }
                    else {
                        return {
                            eventId: eventId,
                            invitedUsers: [...el.invitedUsers,
                                {
                                    userId: userIdTo,
                                    status: false,
                                    dateOfSending: dateOfSending,
                                }
                            ]
                        };
                    }
                }
                else {
                    return el;
                }
            });
            if (!eventSearched) {
                updatedOuterInvites = [...updatedOuterInvites, {
                        invitedUsers: [
                            {
                                userId: userIdTo,
                                status: false,
                                dateOfSending: dateOfSending,
                            }
                        ],
                        eventId: eventId
                    }];
            }
            await this.userModel.updateOne({ userId: userFromData.userId }, {
                $set: {
                    outerInvites: updatedOuterInvites
                }
            });
            const innerInvite = {
                fromUserId: userFromData.userId,
                eventId: eventId,
                dateOfSending: dateOfSending,
                status: false,
            };
            await this.userModel.updateOne({ userId: userIdTo }, {
                $set: {
                    innerInvites: [...userToData.innerInvites, innerInvite]
                }
            });
            return { message: 'Success' };
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async declineInnerInvite(request) {
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const { senderId, eventId } = request.body;
        const updatedUser = await this.userModel.findOneAndUpdate({ userId: userId }, {
            $pull: {
                innerInvites: { fromUserId: senderId, eventId: eventId }
            }
        });
        if (updatedUser)
            return eventId;
        throw new common_1.HttpException({ errorMessage: "Что-то пошло не так" }, 500);
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        ckeck_service_1.CheckService,
        token_service_1.HelpJwtService,
        users_service_1.UserService,
        mail_service_1.MailService,
        mongoose_2.Model])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map