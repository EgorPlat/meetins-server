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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const token_service_1 = require("../../help/token.service");
const mongoose_2 = require("mongoose");
const groups_schema_1 = require("../../schemas/groups.schema");
const user_schema_1 = require("../../schemas/user.schema");
let GroupsService = class GroupsService {
    constructor(jwtHelpService, groupsModel, usersModel) {
        this.jwtHelpService = jwtHelpService;
        this.groupsModel = groupsModel;
        this.usersModel = usersModel;
    }
    async getAllGroups(request) {
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const inithiator = await this.usersModel.findOne({ userId: userId }, { isFilter: true, interests: true });
        let groupList = [];
        if (!inithiator.isFilter) {
            groupList = await this.groupsModel.find();
        }
        else {
            groupList = await this.groupsModel.find({ interestsId: { $elemMatch: { $in: inithiator.interests } } });
        }
        return groupList;
    }
    async getGroupById(request) {
        const groupInfo = await this.groupsModel.findOne({ groupId: request.body.id });
        return groupInfo;
    }
    async joinToGroup(request) {
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const groupInfo = await this.groupsModel.findOneAndUpdate({ groupId: request.body.groupId }, {
            $push: { membersId: userId }
        }, { returnDocument: 'after' });
        return groupInfo;
    }
    async manageGroupByid(file, request) {
        const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: request.body.groupId }, { $set: {
                headAvatar: file.filename,
                name: request.body.name,
                description: request.body.description
            } }, { returnDocument: 'after' });
        return updatedGroup;
    }
    async getGroupMembersInfo(request) {
        const groupId = await this.groupsModel.findOne({ groupId: request.body.id });
        if (groupId === null || groupId === void 0 ? void 0 : groupId.membersId) {
            const userData = await this.usersModel.find({ userId: { $in: groupId === null || groupId === void 0 ? void 0 : groupId.membersId } }, {
                name: true,
                _id: false,
                avatar: true,
                login: true
            });
            throw new common_1.HttpException(userData, 200);
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Ничего не найдено." }, 500);
        }
    }
    async createNewGroup(request) {
        const newGroup = request.body;
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const groupCandidate = {
            groupId: Math.floor(Math.random() * 1000000),
            name: newGroup.name,
            description: newGroup.description,
            membersId: [userId],
            creatorId: userId,
            interestsId: newGroup.interestsId
        };
        const createdGroup = await this.groupsModel.create(groupCandidate);
        if (createdGroup) {
            return createdGroup;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Пожалуйста попробуйте снова." }, 500);
        }
    }
    async createNewPostInGroup(files, request) {
        const filesForPost = files.map(el => {
            return {
                src: el.filename,
                type: el.mimetype
            };
        });
        const newPost = {
            id: Math.floor(Math.random() * 100000),
            title: request.body.name,
            description: request.body.description,
            date: Date.now(),
            likes: [],
            views: 1,
            comments: [],
            files: filesForPost
        };
        const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: request.body.groupId }, { $push: {
                posts: newPost
            } }, { returnDocument: 'after' });
        if (updatedGroup) {
            return updatedGroup;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Пожалуйста попробуйте снова." }, 500);
        }
    }
    async createNewTalkInGroup(request) {
        const { title, groupId } = request.body;
        const newTalk = {
            id: Math.floor(Math.random() * 1000000),
            title: title,
            dateOfCreation: new Date(),
            messages: []
        };
        const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: groupId }, { $push: {
                talks: newTalk
            } }, { returnDocument: "after" });
        if (updatedGroup) {
            return updatedGroup;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
        }
    }
    async addNewMessageInGroupTalk(request) {
        const { groupId, talkId, text, userId } = request.body;
        const findedGroup = await this.groupsModel.find({ groupId: groupId });
        if (findedGroup) {
            return findedGroup[0].talks.filter(el => el.id === talkId)[0].messages;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
        }
    }
    async getGroupTalksList(request) {
        var _a;
        const { groupId } = request.body;
        const findedTalks = await this.groupsModel.find({ groupId: groupId }, {
            talks: true
        });
        if (findedTalks) {
            return (_a = findedTalks[0]) === null || _a === void 0 ? void 0 : _a.talks;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
        }
    }
    async createNewMessageInGroupTalk(request) {
        const { groupId, talkId, text } = request.body;
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const message = { userId: userId, date: new Date(), text: text };
        const findedGroup = await this.groupsModel.updateOne({ "talks.id": talkId, groupId: groupId }, {
            $push: {
                "talks.$.messages": message
            }
        });
        if (findedGroup) {
            return message;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
        }
    }
    async getTalkMessagesInGroupById(request) {
        var _a;
        const { groupId, talkId } = request.body;
        const findedGroup = await this.groupsModel.findOne({ "talks.id": talkId, groupId: groupId });
        if (findedGroup) {
            return (_a = findedGroup.talks.filter(talk => talk.id === talkId)[0]) === null || _a === void 0 ? void 0 : _a.messages;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
        }
    }
    async addNewCommentIntoPost(request, groupId, postId) {
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const inithiator = await this.usersModel.findOne({ userId: userId }, { avatar: true });
        const date = new Date();
        const newComment = {
            userId: userId,
            date: date,
            avatar: inithiator.avatar,
            text: request.body.text
        };
        const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: +groupId, "posts.id": +postId }, {
            $push: { "posts.$.comments": newComment }
        }, { returnDocument: 'after' });
        return updatedGroup;
    }
    async likePostInGroup(request, groupId, postId) {
        const decodedToken = this.jwtHelpService.decodeJwt(request);
        const updatedGroup = this.groupsModel.findOneAndUpdate({ groupId: +groupId, "posts.id": +postId }, {
            $addToSet: { "posts.$.likes": decodedToken.userId }
        }, { returnDocument: "after" });
        if (updatedGroup)
            return updatedGroup;
        throw new common_1.HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка" }, 400);
    }
    async unlikePostInGroup(request, groupId, postId) {
        const decodedToken = this.jwtHelpService.decodeJwt(request);
        const updatedUser = this.groupsModel.findOneAndUpdate({ groupId: +groupId, "posts.id": +postId }, {
            $pull: { "posts.$.likes": decodedToken.userId }
        }, { returnDocument: "after" });
        if (updatedUser)
            return updatedUser;
        throw new common_1.HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка" }, 400);
    }
};
GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(groups_schema_1.Group.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [token_service_1.HelpJwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], GroupsService);
exports.GroupsService = GroupsService;
//# sourceMappingURL=groupsPosts.service.js.map