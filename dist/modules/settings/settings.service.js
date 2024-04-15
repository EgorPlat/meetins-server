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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const token_service_1 = require("../../help/token.service");
let SettingsService = class SettingsService {
    constructor(userService, jwtService, helpJwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.helpJwtService = helpJwtService;
    }
    async updateUserAvatar(file, request) {
        const decodedToken = await this.helpJwtService.decodeJwt(request);
        const user = await this.userService.getUserByEmail(decodedToken.email);
        const updatedUser = await this.userService.updateUserAvatar(file, user);
        throw new common_1.HttpException(updatedUser, 200);
    }
    async updateUserStatus(request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = await this.userService.updateUserStatus(decodedToken, request.body.status);
        throw new common_1.HttpException(updatedUser, 200);
    }
    async updateUserAccount(request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = await this.userService.updateUserAccount(decodedToken, request.body);
        throw new common_1.HttpException(updatedUser, 200);
    }
    async updateFilterStatus(request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = await this.userService.updateUserFilterStatus(decodedToken, request.body.isFilter);
        throw new common_1.HttpException(updatedUser, 200);
    }
    async updateUserProfile(request) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = await this.userService.updateUserProfile(decodedToken, request.body);
        throw new common_1.HttpException(updatedUser, 200);
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService, jwt_1.JwtService, token_service_1.HelpJwtService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map