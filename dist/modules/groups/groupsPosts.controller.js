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
    getGroupMembersInfo(request) {
        return this.groupsService.getGroupMembersInfo(request);
    }
    createNewGroup(request) {
        return this.groupsService.createNewGroup(request);
    }
    createNewPostInGroup(files, request) {
        return this.groupsService.createNewPostInGroup(files, request);
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
GroupsController = __decorate([
    (0, common_1.Controller)('groups'),
    (0, swagger_1.ApiTags)('Группы'),
    __metadata("design:paramtypes", [groupsPosts_service_1.GroupsService])
], GroupsController);
exports.GroupsController = GroupsController;
//# sourceMappingURL=groupsPosts.controller.js.map