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
exports.MusicAuthorSchema = exports.MusicAuthor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let MusicAuthor = class MusicAuthor {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Уникальный ид юзера' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MusicAuthor.prototype, "authorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Имя исполнителя", description: 'Имя исполнителя' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MusicAuthor.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: 'Массив композиций автора' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], MusicAuthor.prototype, "compositions", void 0);
MusicAuthor = __decorate([
    (0, mongoose_1.Schema)()
], MusicAuthor);
exports.MusicAuthor = MusicAuthor;
exports.MusicAuthorSchema = mongoose_1.SchemaFactory.createForClass(MusicAuthor);
//# sourceMappingURL=musicAuthor.schema.js.map