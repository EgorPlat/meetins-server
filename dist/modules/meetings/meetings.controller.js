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
const meetings_service_1 = require("./meetings.service");
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
MeetingsController = __decorate([
    (0, common_1.Controller)('meetings'),
    (0, swagger_1.ApiTags)('Встречи'),
    __metadata("design:paramtypes", [meetings_service_1.MeetingsService])
], MeetingsController);
exports.MeetingsController = MeetingsController;
//# sourceMappingURL=meetings.controller.js.map