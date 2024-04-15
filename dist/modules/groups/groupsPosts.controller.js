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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const groupsPosts_service_1 = require("./groupsPosts.service");
const platform_express_1 = require("@nestjs/platform-express");
const fileSize_middleware_1 = require("../../middlewares/fileSize.middleware");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    getAllGroups(request) {
        return this.groupsService.getAllGroups(request);
    }
    getGroupById(request) {
        return this.groupsService.getGroupById(request);
    }
    joinToGroup(request) {
        return this.groupsService.joinToGroup(request);
    }
    manageGroupByid(file, request) {
        return this.groupsService.manageGroupByid(file, request);
    }
    getGroupMembersInfo(request) {
        return this.groupsService.getGroupMembersInfo(request);
    }
    createNewGroup(request) {
        return this.groupsService.createNewGroup(request);
    }
    createNewPostInGroup(files, request) {
        return this.groupsService.createNewPostInGroup(files, request);
    }
    createNewTalkInGroup(request) {
        return this.groupsService.createNewTalkInGroup(request);
    }
    createNewMessageInGroupTalk(request) {
        return this.groupsService.createNewMessageInGroupTalk(request);
    }
    getGroupTalksList(request) {
        return this.groupsService.getGroupTalksList(request);
    }
    getTalkMessagesInGroupById(request) {
        return this.groupsService.getTalkMessagesInGroupById(request);
    }
    addNewCommentIntoPost(params, request) {
        return this.groupsService.addNewCommentIntoPost(request, params.groupId, params.postId);
    }
    likePostInGroup(params, request) {
        return this.groupsService.likePostInGroup(request, params.groupId, params.postId);
    }
    unlikePostInGroup(params, request) {
        return this.groupsService.unlikePostInGroup(request, params.groupId, params.postId);
    }
};
__decorate([
    (0, common_1.Get)('/get-all-groups'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getAllGroups", null);
__decorate([
    (0, common_1.Post)('/get-group-by-id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroupById", null);
__decorate([
    (0, common_1.Post)('/join-to-group'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "joinToGroup", null);
__decorate([
    (0, common_1.Post)('/manage-group-by-id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('headImage', fileSize_middleware_1.FinallMulterOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "manageGroupByid", null);
__decorate([
    (0, common_1.Post)('/get-group-members-info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroupMembersInfo", null);
__decorate([
    (0, common_1.Post)('/create-new-group'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "createNewGroup", null);
__decorate([
    (0, common_1.Post)('/create-new-post-in-group'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('media', 5, fileSize_middleware_1.FinallMulterOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "createNewPostInGroup", null);
__decorate([
    (0, common_1.Post)('/create-new-talk-in-group'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "createNewTalkInGroup", null);
__decorate([
    (0, common_1.Post)('/create-new-message-in-group-talk'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "createNewMessageInGroupTalk", null);
__decorate([
    (0, common_1.Post)('/get-group-talks-by-id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroupTalksList", null);
__decorate([
    (0, common_1.Post)('/get-group-talk-messages-by-id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getTalkMessagesInGroupById", null);
__decorate([
    (0, common_1.Post)('/add-new-comment-into-post/:groupId/:postId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "addNewCommentIntoPost", null);
__decorate([
    (0, common_1.Put)('/like/:groupId/:postId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "likePostInGroup", null);
__decorate([
    (0, common_1.Put)('/unlike/:groupId/:postId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "unlikePostInGroup", null);
GroupsController = __decorate([
    (0, common_1.Controller)('groups'),
    (0, swagger_1.ApiTags)('Группы'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [groupsPosts_service_1.GroupsService])
], GroupsController);
exports.GroupsController = GroupsController;
//# sourceMappingURL=groupsPosts.controller.js.map