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
exports.GroupSchema = exports.Group = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Group = class Group {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Уникальный ид' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Group.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Имя', description: 'Имя сообщества' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Описание', description: 'Описание сообщества' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mainAvatar1.png', description: 'Путь к файлу аватара для группы' }),
    (0, mongoose_1.Prop)({ default: "no-avatar.jpg" }),
    __metadata("design:type", String)
], Group.prototype, "mainAvatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'headAvatar1.png', description: 'Путь к файлу аватара-шапки для группы' }),
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Group.prototype, "headAvatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['id48932'], description: 'Массив айдишников участников' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Group.prototype, "membersId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'id48932', description: 'Айди создателя' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "creatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: 'Массив публикаций' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Group.prototype, "posts", void 0);
Group = __decorate([
    (0, mongoose_1.Schema)()
], Group);
exports.Group = Group;
exports.GroupSchema = mongoose_1.SchemaFactory.createForClass(Group);
//# sourceMappingURL=groups.schema.js.map