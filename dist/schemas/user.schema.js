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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный ид' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Включены ли фильтры по интересам' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isFilter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[userId3534534]', description: 'Массив пользователей в закладках' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "markedUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Имя', description: 'Имя пользователя' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Строка', description: 'Статус пользователя' }),
    (0, mongoose_1.Prop)({ default: 'Это мой новый статус!' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '89693469999', description: 'Телефон пользователя' }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'Email пользователя' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sdfdf3r4341', description: 'Пароль' }),
    (0, mongoose_1.Prop)({ default: 'password' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'M', description: 'Пол пользователя' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Строка', description: 'URL картинки' }),
    (0, mongoose_1.Prop)({ default: 'no-avatar.jpg' }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-03-25T13:40:13.192+00:00', description: 'Дата регистрации пользователя' }),
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "dateRegister", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Строка', description: 'Статус пользователя' }),
    (0, mongoose_1.Prop)({ default: Math.floor(Math.random() * 10000) }),
    __metadata("design:type", Number)
], User.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-03-25T13:40:13.192+00:00', description: 'Дата рождения пользователя' }),
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Строка', description: 'Город пользователя' }),
    (0, mongoose_1.Prop)({ default: 'Секрет' }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Число', description: 'Возраст пользователя' }),
    (0, mongoose_1.Prop)({ default: 18 }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: 'Мероприятия' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "events", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: 'Посты' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: 'Интересы' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "interests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: 'Отправленные приглашения' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "outerInvites", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: 'Входящие приглашения' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "innerInvites", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2], description: 'Купленные возможности' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "purchasedOpportunities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { color: "blue", title: "User" }, description: 'Тэг' }),
    (0, mongoose_1.Prop)({
        type: {},
        default: { color: "rgba(42, 132, 251, 0.878)", title: "Гость" }
    }),
    __metadata("design:type", Object)
], User.prototype, "tag", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map