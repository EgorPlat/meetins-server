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
exports.WallService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const token_service_1 = require("../../help/token.service");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const groups_schema_1 = require("../../schemas/groups.schema");
let WallService = class WallService {
    constructor(jwtHelpService, usersModel, groupsModel) {
        this.jwtHelpService = jwtHelpService;
        this.usersModel = usersModel;
        this.groupsModel = groupsModel;
    }
    async getCurrentWall(request) {
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const inithiator = await this.usersModel.findOne({ userId: userId });
        let usersPosts = [];
        let groupsPosts = [];
        if (inithiator.isFilter) {
            usersPosts = await this.usersModel.aggregate([
                { $match: { "posts": { $exists: true, $not: { $size: 0 } } } },
                { $match: { interests: { $elemMatch: { $in: inithiator.interests } } } },
                { $unwind: "$posts" },
                { $project: { post: "$posts", _id: 0, name: 1, avatar: 1, linkId: "$login" } }
            ]);
            groupsPosts = await this.groupsModel.aggregate([
                { $match: { "posts": { $exists: true, $not: { $size: 0 } } } },
                { $match: { interestsId: { $elemMatch: { $in: inithiator.interests } } } },
                { $unwind: "$posts" },
                { $project: { post: "$posts", _id: 0, name: 1, avatar: "$mainAvatar", linkId: "$groupId" } }
            ]);
        }
        else {
            usersPosts = await this.usersModel.aggregate([
                { $match: { "posts": { $exists: true, $not: { $size: 0 } } } },
                { $unwind: "$posts" },
                { $project: { post: "$posts", _id: 0, name: 1, avatar: 1, linkId: "$login" } }
            ]);
            groupsPosts = await this.groupsModel.aggregate([
                { $match: { "posts": { $exists: true, $not: { $size: 0 } } } },
                { $unwind: "$posts" },
                { $project: { post: "$posts", _id: 0, name: 1, avatar: "$mainAvatar", linkId: "$groupId" } }
            ]);
        }
        usersPosts = usersPosts.map(el => { return Object.assign(Object.assign({}, el), { isGroup: false }); });
        groupsPosts = groupsPosts.map(el => { return Object.assign(Object.assign({}, el), { isGroup: true }); });
        return [...usersPosts, ...groupsPosts].map(el => {
            return {
                postTitle: el.post.title,
                postDescription: el.post.description,
                postDate: el.post.date,
                postLikes: el.post.likes,
                postFiles: el.post.files,
                name: el.name,
                avatar: el.avatar,
                isGroup: el.isGroup,
                linkId: el.linkId
            };
        });
    }
    ;
};
WallService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(groups_schema_1.Group.name)),
    __metadata("design:paramtypes", [token_service_1.HelpJwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], WallService);
exports.WallService = WallService;
//# sourceMappingURL=wall.service.js.map