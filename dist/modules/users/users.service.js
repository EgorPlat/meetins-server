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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const token_service_1 = require("../../help/token.service");
let UserService = class UserService {
    constructor(userModel, helpJwtService) {
        this.userModel = userModel;
        this.helpJwtService = helpJwtService;
    }
    async updateUsersData() {
        await this.userModel.updateMany({}, { $set: { tag: { color: "rgba(42, 132, 251, 0.878)", title: "Гость" } } });
        await this.userModel.updateMany({}, { $set: { purchasedOpportunities: [] } });
    }
    ;
    async getUsers() {
        const users = await this.userModel.find({}, {
            password: false,
            _id: false,
            __v: false
        });
        return users;
    }
    ;
    async addUser(dto) {
        let candidate = Object.assign(Object.assign({}, dto), { login: Math.floor(Math.random() * 20000), userId: "id" + String(Math.floor(Math.random() * 100000)) });
        const user = await this.userModel.create(candidate);
        if (user) {
            return user;
        }
    }
    ;
    async getUserByLogin(login) {
        const user = await this.userModel.findOne({ login: login }, {
            password: false,
            _id: false,
            __v: false
        });
        return user;
    }
    ;
    async getUserByLoginMainInfoOnly(login) {
        const user = await this.userModel.findOne({ login: login }, {
            password: false,
            _id: false,
            __v: false,
            innerInvites: false,
            outerInvites: false,
            isFilter: false,
            markedUsers: false,
            purchasedOpportunities: false
        });
        return user;
    }
    ;
    async getUserList() {
        const user = await this.userModel.find({}, {
            password: false,
            _id: false,
            __v: false
        });
        const peoples = user.map(user => {
            return {
                email: user.email,
                login: user.login,
                userName: user.name,
                userAvatar: user.avatar,
                status: user.status,
                age: user.age,
                city: user.city,
                gender: user.gender,
                tag: user.tag
            };
        });
        return peoples;
    }
    ;
    async addUserIntoMarkedList(request) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        const { neededUserId } = request.body;
        const updatedUser = this.userModel.findOneAndUpdate({ userId: userId }, { $push: {
                markedUsers: neededUserId
            } }, { returnDocument: 'after' });
        if (updatedUser)
            return updatedUser;
        throw new common_1.HttpException({ errorMessage: "Что-то пошло не так." }, 400);
    }
    ;
    async formMarkedUsersInfoByIds(userId) {
        const usersInfo = await this.userModel.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $unwind: "$markedUsers"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "markedUsers",
                    foreignField: "userId",
                    as: "markedUserInfo"
                }
            },
            {
                $unwind: "$markedUserInfo"
            },
            {
                $project: {
                    _id: false,
                    "markedUserInfo.name": true,
                    "markedUserInfo.avatar": true,
                    "markedUserInfo.login": true,
                    "markedUserInfo.userId": true
                }
            }
        ]);
        if (usersInfo)
            return usersInfo.map(el => { return el.markedUserInfo; });
    }
    ;
    async updateUserTag(request) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        const { title, color } = request.body;
        const updatedUser = await this.userModel.findOneAndUpdate({ userId: userId }, {
            $set: { tag: { title, color } }
        }, { returnDocument: 'after' });
        if (updatedUser)
            return updatedUser;
        throw new common_1.HttpException({ errorMessage: "Что-то пошло не так." }, 400);
    }
    ;
    async getMarkedUsersInfo(request) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        const markedUsersInfo = await this.formMarkedUsersInfoByIds(userId);
        if (markedUsersInfo) {
            return markedUsersInfo;
        }
        throw new common_1.HttpException({ errorMessage: "Что-то пошло не так." }, 400);
    }
    ;
    async removeUserFromMarkedList(request, removedUserId) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        await this.userModel.updateOne({ userId: userId }, { $pull: {
                markedUsers: removedUserId
            } });
        const markedUsersInfo = await this.formMarkedUsersInfoByIds(userId);
        if (markedUsersInfo) {
            return markedUsersInfo;
        }
        throw new common_1.HttpException({ errorMessage: "Что-то пошло не так." }, 400);
    }
    ;
    async getUserListByPageNumber(request) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        const inithiator = await this.userModel.findOne({ userId: userId });
        const { pageNumber, pageSize, filters } = request.body;
        let users = [];
        if (inithiator.isFilter) {
            users = await this.userModel.find({ interests: { $elemMatch: { $in: inithiator.interests } } }, {
                password: false,
                _id: false,
                __v: false
            });
        }
        else {
            if (filters.event) {
                users = await this.userModel.find({
                    events: { $elemMatch: { $eq: String(filters.event) } }
                }, {
                    password: false,
                    _id: false,
                    __v: false
                });
            }
            else {
                users = await this.userModel.find({}, {
                    password: false,
                    _id: false,
                    __v: false
                });
            }
        }
        let peoples = users.map((user, index) => {
            return {
                email: user.email,
                login: user.login,
                userName: user.name,
                userAvatar: user.avatar,
                status: user.status,
                age: user.age,
                city: user.city,
                gender: user.gender,
                tag: user.tag
            };
        });
        if (filters.age !== 0) {
            peoples = peoples.filter(peoples => peoples.age === filters.age);
        }
        if (filters.gender !== 'all') {
            peoples = peoples.filter(peoples => peoples.gender === filters.gender);
        }
        const maxPage = Math.ceil(peoples.length / pageSize);
        peoples = peoples.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize);
        return { data: peoples, maxPage: maxPage };
    }
    ;
    async getSortedPeoples(sortParams) {
        let peoples = await this.getUserList();
        if (sortParams.age !== 50) {
            peoples = peoples.filter((user) => user.age == sortParams.age);
        }
        if (sortParams.gender !== "") {
            peoples = peoples.filter((user) => user.gender == sortParams.gender);
            ;
        }
        throw new common_1.HttpException(peoples, 200);
    }
    ;
    async getUpdatedUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email }, {
            password: false,
            _id: false,
            __v: false
        });
        return user;
    }
    ;
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email }, {
            _id: false,
            __v: false
        });
        return user;
    }
    ;
    async getUserByUserId(userId) {
        const user = await this.userModel.findOne({ userId: userId }, {
            _id: false,
            __v: false
        });
        return user;
    }
    ;
    async updateUserStatus(decodedToken, status) {
        const updatedUser = await this.userModel.findOneAndUpdate({ email: decodedToken.email }, { $set: { status: status } }, { returnDocument: 'after' });
        if (updatedUser) {
            return updatedUser;
        }
    }
    ;
    async updateUserFilterStatus(decodedToken, filterStatus) {
        const updatedUser = await this.userModel.findOneAndUpdate({ userId: decodedToken.userId }, { $set: { isFilter: filterStatus } }, { returnDocument: 'after' });
        return updatedUser;
    }
    ;
    async updateUserAccount(decodedToken, accountData) {
        const users = await this.userModel.find({
            $or: [
                { email: accountData.email },
                { login: accountData.login }
            ]
        });
        if (users.length === 0) {
            await this.userModel.updateOne({ email: decodedToken.email }, { $set: {
                    email: accountData.email,
                    password: accountData.password,
                    login: accountData.login
                } });
            const updatedUser = await this.getUpdatedUserByEmail(decodedToken.email);
            if (updatedUser) {
                return updatedUser;
            }
        }
        else {
            throw new common_1.HttpException({ message: "Занят login или email" }, 400);
        }
    }
    ;
    async updateUserProfile(decodedToken, accountData) {
        const users = await this.userModel.find({ email: accountData.phoneNumber });
        if (users.length === 0) {
            await this.userModel.findOneAndUpdate({ email: decodedToken.email }, { $set: {
                    phoneNumber: accountData.phoneNumber,
                    name: accountData.name,
                    birthDate: accountData.birthDate,
                } });
            const updatedUser = await this.updateUserBirthDate(decodedToken.email, new Date(accountData.birthDate));
            if (updatedUser) {
                return updatedUser;
            }
        }
        else {
            throw new common_1.HttpException({ message: "Занят login или email" }, 400);
        }
    }
    ;
    async updateUserAvatar(file, user) {
        const updatedUser = await this.userModel.findOneAndUpdate({ email: user.email }, { $set: {
                avatar: file.filename,
            } }, { returnDocument: "after" });
        if (updatedUser) {
            return updatedUser;
        }
    }
    ;
    async updateUserBirthDate(userEmail, date) {
        const actualYear = new Date().getFullYear();
        const userBirthDateYear = date.getFullYear();
        const updatedUser = await this.userModel.findOneAndUpdate({ email: userEmail }, { $set: {
                age: actualYear - userBirthDateYear,
            } }, { returnDocument: "after" });
        return updatedUser;
    }
    ;
    async addUserEvent(request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({ email: decodedToken.email });
        if (!prevUserState.events.includes(body.eventId)) {
            const updatedUser = await this.userModel.findOneAndUpdate({ email: decodedToken.email }, { $set: {
                    events: [...prevUserState.events, body.eventId],
                } }, { returnDocument: "after" });
            if (updatedUser) {
                return updatedUser;
            }
        }
        else {
            throw new common_1.HttpException({ message: "Данное событие уже добавлено" }, 400);
        }
    }
    ;
    async deleteUserEvent(request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({ email: decodedToken.email });
        const updatedUser = await this.userModel.findOneAndUpdate({ email: decodedToken.email }, {
            $set: {
                events: prevUserState.events.filter(el => el !== body.eventId),
            }
        }, { returnDocument: "after" });
        if (updatedUser) {
            return updatedUser;
        }
    }
    ;
    async updateUserInterest(request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = await this.userModel.findOneAndUpdate({ email: decodedToken.email }, {
            $set: {
                interests: body.interests,
            }
        }, { returnDocument: "after" });
        if (updatedUser) {
            return updatedUser;
        }
    }
    ;
    async removeUserInterest(request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({ email: decodedToken.email });
        await this.userModel.updateOne({ email: decodedToken.email }, { $set: {
                interests: prevUserState === null || prevUserState === void 0 ? void 0 : prevUserState.interests.filter(el => el !== body.interestId),
            } });
        const updatedUser = await this.getUpdatedUserByEmail(decodedToken.email);
        if (updatedUser) {
            return updatedUser;
        }
    }
    ;
    async addUserPost(files, request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const newPost = {
            id: String(Math.floor(Math.random() * 150000)),
            title: body.title,
            description: body.description,
            files: files.map(el => {
                return {
                    src: el.filename,
                    type: el.mimetype
                };
            }),
            date: String(new Date()),
            likes: [],
        };
        const updatedUser = await this.userModel.findOneAndUpdate({ email: decodedToken.email }, { $push: {
                posts: newPost
            } }, { returnDocument: "after" });
        if (updatedUser) {
            throw new common_1.HttpException(updatedUser, 200);
        }
        else {
            throw new common_1.HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка" }, 400);
        }
    }
    ;
    async addLikeToUserPost(request, postId, userId) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = this.userModel.findOneAndUpdate({ userId: userId, "posts.id": postId }, {
            $addToSet: { "posts.$.likes": decodedToken.userId }
        }, { returnDocument: "after" });
        if (updatedUser)
            return updatedUser;
        throw new common_1.HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка" }, 400);
    }
    ;
    async removeLikeFromUserPost(request, postId, userId) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = this.userModel.findOneAndUpdate({ userId: userId, "posts.id": postId }, {
            $pull: { "posts.$.likes": decodedToken.userId }
        }, { returnDocument: "after" });
        if (updatedUser)
            return updatedUser;
        throw new common_1.HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка" }, 400);
    }
    ;
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        token_service_1.HelpJwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map