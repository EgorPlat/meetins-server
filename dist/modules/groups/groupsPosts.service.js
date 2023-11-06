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
        const allGroups = await this.groupsModel.find();
        return allGroups;
    }
    async getGroupById(request) {
        const groupInfo = await this.groupsModel.findOne({ groupId: request.body.id });
        return groupInfo;
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
            groupId: 1,
            name: newGroup.name,
            description: newGroup.description,
            membersId: userId,
            creatorId: userId
        };
        const createdGroup = await this.groupsModel.create(newGroup);
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
            likes: 1,
            views: 1,
            comments: [],
            files: filesForPost
        };
        const updatedGroup = await this.groupsModel.updateOne({ groupId: request.body.groupId }, { $push: {
                posts: newPost
            } });
        if (newPost) {
            return newPost;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Пожалуйста попробуйте снова." }, 500);
        }
    }
    async createNewTalkInGroup(request) {
        const { talkData } = request.body;
        const updatedGroup = await this.groupsModel.updateOne({ groupId: talkData.groupId }, { $push: {
                talks: {
                    id: Math.floor(Math.random() * 1000000),
                    title: talkData.title,
                    dateOfCreation: new Date(),
                    messages: []
                }
            } });
        if (updatedGroup) {
            return true;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
        }
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