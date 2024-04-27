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
exports.MeetingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const meetings_service_1 = require("./meetings.service");
const platform_express_1 = require("@nestjs/platform-express");
const fileSize_middleware_1 = require("../../middlewares/fileSize.middleware");
let MeetingsController = class MeetingsController {
    constructor(meetingsService) {
        this.meetingsService = meetingsService;
    }
    getAllMeetings() {
        return this.meetingsService.getAllMeetings();
    }
    createNewMeeting(request) {
        return this.meetingsService.createNewMeeting(request);
    }
    uploadMedia(request, file) {
        return this.meetingsService.uploadMedia(request, file);
    }
    regInMeetings(request, meetingId) {
        return this.meetingsService.regInMeetings(request, meetingId);
    }
    sendCommentAboutMeeting(request) {
        return this.meetingsService.sendCommentAboutMeeting(request);
    }
    getUserPlaces(params, request) {
        return this.meetingsService.getUserPlaces(request, params.userId);
    }
};
__decorate([
    (0, common_1.Get)('/get-all-meetings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MeetingsController.prototype, "getAllMeetings", null);
__decorate([
    (0, common_1.Post)('/create-meeting'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MeetingsController.prototype, "createNewMeeting", null);
__decorate([
    (0, common_1.Post)('/upload-media'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('uploadedFile', fileSize_middleware_1.FinallMulterOptions)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MeetingsController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Put)('/reg-in-meeting/:meetingId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('meetingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MeetingsController.prototype, "regInMeetings", null);
__decorate([
    (0, common_1.Post)('/send-comment'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MeetingsController.prototype, "sendCommentAboutMeeting", null);
__decorate([
    (0, common_1.Get)('/places/:userId/'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MeetingsController.prototype, "getUserPlaces", null);
MeetingsController = __decorate([
    (0, common_1.Controller)('meetings'),
    (0, swagger_1.ApiTags)('Встречи'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [meetings_service_1.MeetingsService])
], MeetingsController);
exports.MeetingsController = MeetingsController;
//# sourceMappingURL=meetings.controller.js.map