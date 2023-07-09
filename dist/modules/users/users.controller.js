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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_user_dto_1 = require("../../dto/create-user.dto");
const user_schema_1 = require("../../schemas/user.schema");
const users_service_1 = require("./users.service");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    updateUserData() {
        return this.userService.updateUsersData();
    }
    getUsers() {
        return this.userService.getUsers();
    }
    addUser(userDto) {
        return this.userService.addUser(userDto);
    }
    getUserByLogin(login) {
        return this.userService.getUserByLogin(login);
    }
    getUserByUserId(req) {
        return this.userService.getUserByUserId(req.body.userId);
    }
    removeUserInterest(req) {
        return this.userService.removeUserInterest(req);
    }
    updateUserInterest(req) {
        return this.userService.updateUserInterest(req);
    }
    getUserList() {
        return this.userService.getUserList();
    }
    getUserListByPageNumber(request) {
        return this.userService.getUserListByPageNumber(request);
    }
    getSortedPeoples(sortParams) {
        return this.userService.getSortedPeoples(sortParams);
    }
    addUserEvent(request) {
        return this.userService.addUserEvent(request);
    }
    deleteUserEvent(request) {
        return this.userService.deleteUserEvent(request);
    }
    addUserPost(file, request) {
        return this.userService.addUserPost(file, request);
    }
};
__decorate([
    (0, common_1.Get)('/newData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Список пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_schema_1.User] }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создать пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/getUserByLogin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserByLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/getUserByUserId'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удалить интерес пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/removeUserInterest'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUserInterest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновить интересы пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/updateUserInterest'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserInterest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить список пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Get)('/getUserList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить список пользователей по номеру страницы' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/getUserListByPageNumber'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserListByPageNumber", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить список сортированных пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/getSortedUsers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getSortedPeoples", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Добавить новое мероприятие для пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/addUserEvent'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addUserEvent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удалить мероприятие для пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Post)('/deleteUserEvent'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUserEvent", null);
__decorate([
    (0, common_1.Post)('/addUserPost'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('uploadedFile', {
        storage: (0, multer_1.diskStorage)({
            destination: './src/static',
            filename: (req, file, cb) => {
                const fileNameSplit = file.originalname.split('.');
                const fileExt = fileNameSplit[fileNameSplit.length - 1];
                cb(null, `${Date.now()}.${fileExt}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addUserPost", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Пользователи'),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map