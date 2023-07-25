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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const app_gateway_1 = require("../../app.gateway");
const users_service_1 = require("../users/users.service");
let ProfileService = class ProfileService {
    constructor(jwtService, userService, socketServer) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.socketServer = socketServer;
    }
    async getMyProfile(request) {
        const token = request.cookies['access_token'];
        const decodedToken = this.jwtService.decode(token);
        const user = await this.userService.getUserByEmail(decodedToken.email);
        if (user) {
            throw new common_1.HttpException(user, 200);
        }
        else {
            throw new common_1.HttpException('Ошибка. Обновите токен.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getProfileByLogin(login) {
        const user = await this.userService.getUserByLogin(login);
        if (user) {
            throw new common_1.HttpException(user, 200);
        }
        else {
            throw new common_1.HttpException('Ошибка. Пользователь не найден.', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UserService,
        app_gateway_1.AppGateway])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map