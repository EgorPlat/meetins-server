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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const common_2 = require("@nestjs/common");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    getEventsByCategory(request) {
        return this.eventService.getEventsByCategory(request.body);
    }
    getEventInfoById(request) {
        return this.eventService.getEventInfoById(request.body.eventId);
    }
    getCommentsForEventById(request) {
        return this.eventService.getCommentsForEventById(request.body.eventId);
    }
    sendInviteToUser(request) {
        return this.eventService.sendInviteToUser(request);
    }
    getUserEventsInfo(request) {
        return this.eventService.getUserEventsInfo(request);
    }
    getUserInnerInvitesEventInfo(request) {
        return this.eventService.getUserInnerInvitesEventInfo(request);
    }
    getUserOuterInvitesEventInfo(request) {
        return this.eventService.getUserOuterInvitesEventInfo(request);
    }
};
__decorate([
    (0, common_1.Post)('/getEventsCategory'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventsByCategory", null);
__decorate([
    (0, common_1.Post)('/getEventInfoById'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventInfoById", null);
__decorate([
    (0, common_1.Post)('/getCommentsForEventById'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getCommentsForEventById", null);
__decorate([
    (0, common_1.Post)('/sendInviteToUser'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "sendInviteToUser", null);
__decorate([
    (0, common_1.Get)('/getUserEventsInfo'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getUserEventsInfo", null);
__decorate([
    (0, common_1.Get)('/getUserInnerInvitesEventInfo'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getUserInnerInvitesEventInfo", null);
__decorate([
    (0, common_1.Get)('/getUserOuterInvitesEventInfo'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getUserOuterInvitesEventInfo", null);
EventController = __decorate([
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map