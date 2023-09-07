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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingSchema = exports.Meeting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Meeting = class Meeting {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный ид' }),
    (0, mongoose_1.Prop)({ default: "meeting" + `${Math.floor(Math.random() * 9999999)}` }),
    __metadata("design:type", String)
], Meeting.prototype, "meetingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['userId1', 'userId2'], description: 'Айди пользователей' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Meeting.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-10-10 13:45', description: 'Дата мероприятия' }),
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], Meeting.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Описание встречи', description: 'Описание встречи' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meeting.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Цель встречи', description: 'Цель встречи' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meeting.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { userId: "userId", text: "text", date: "2023-10-11" }, description: 'Комментарии' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Meeting.prototype, "comments", void 0);
Meeting = __decorate([
    (0, mongoose_1.Schema)()
], Meeting);
exports.Meeting = Meeting;
exports.MeetingSchema = mongoose_1.SchemaFactory.createForClass(Meeting);
//# sourceMappingURL=meeting.schema.js.map