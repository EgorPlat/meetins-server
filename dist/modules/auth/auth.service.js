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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const unConfirmedUser_schema_1 = require("../../schemas/unConfirmedUser.schema");
const users_service_1 = require("../users/users.service");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService, unConfirmedUserModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.unConfirmedUserModel = unConfirmedUserModel;
    }
    async login(userDto, response) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (user) {
            const passwordEquals = user.password === userDto.password;
            if (passwordEquals && user.password) {
                const data = await this.generateToken(user);
                response.cookie('access_token', data.auth.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 60 * 60 * 1000,
                    expires: new Date(Date.now() + (3600000))
                });
                response.status(200).send(data);
            }
            else {
                throw new common_1.HttpException({ message: 'Неккоректные данные. Пожалуйста попробуйте снова.' }, 400);
            }
        }
        else {
            throw new common_1.HttpException({ message: 'Запрашиваемый пользователь не найден. Пожалуйста попробуйте снова.' }, 404);
        }
    }
    async logout(response, request) {
        try {
            response.clearCookie('access_token');
            response.status(200).send('Logged out');
        }
        catch (err) {
            console.log(err);
            response.status(500).send('Failed');
        }
    }
    async generateToken(user) {
        const payload = {
            email: user.email,
            name: user.name,
            city: user.city,
            avatar: user.avatar,
            userId: user.userId
        };
        return {
            auth: { token: this.jwtService.sign(payload, { expiresIn: '1h' }) },
            profile: { user }
        };
    }
    async registration(userDto) {
        const condidate = await this.userService.getUserByEmail(userDto.email);
        if (condidate) {
            throw new common_1.HttpException('Пользователь с таким email уже есть.', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.addUser(userDto);
        const userWithTokens = await this.generateToken(user);
        throw new common_1.HttpException(userWithTokens, 201);
    }
    async registrationWithConfirmation(userDto) {
        const findedUser = await this.userService.getUserByEmail(userDto.email);
        const createdUser = await this.unConfirmedUserModel.findOne({ email: userDto.email });
        if (findedUser || createdUser) {
            throw new common_1.HttpException('Пользователь с таким email уже есть.', common_1.HttpStatus.BAD_REQUEST);
        }
        const code = Math.floor(Math.random() * 900000);
        let candidate = Object.assign(Object.assign({}, userDto), { actualCodeForConfirmation: code, login: Math.floor(Math.random() * 20000), userId: "id" + String(Math.floor(Math.random() * 100000)) });
        const user = await this.unConfirmedUserModel.create(candidate);
        if (user) {
            await this.mailService.sendUserRegisterConfirmationMail(user.email, user.name, user.actualCodeForConfirmation);
            throw new common_1.HttpException('Success', 201);
        }
        else {
            throw new common_1.HttpException('Server error', 500);
        }
    }
    async acceptUserAccount(acceptData, response) {
        const unConfirmedUser = await this.unConfirmedUserModel.findOne({ email: acceptData.email });
        if (unConfirmedUser.actualCodeForConfirmation === acceptData.code) {
            const user = await this.userService.addUser({
                email: unConfirmedUser.email,
                name: unConfirmedUser.name,
                city: unConfirmedUser.city,
                gender: unConfirmedUser.gender,
                password: unConfirmedUser.password,
            });
            if (user) {
                const userWithTokens = await this.generateToken(user);
                await this.unConfirmedUserModel.deleteOne({ email: acceptData.email });
                response.cookie('access_token', userWithTokens.auth.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 60 * 60 * 1000,
                    expires: new Date(Date.now() + (3600000))
                });
                response.status(200).send(userWithTokens);
            }
        }
        else {
            throw new common_1.HttpException('Неверный код', 400);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(unConfirmedUser_schema_1.UnConfirmedUser.name)),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map