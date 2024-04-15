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
exports.InterestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const interest_service_1 = require("./interest.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let InterestsController = class InterestsController {
    constructor(interestsService) {
        this.interestsService = interestsService;
    }
    getInterestsById(request) {
        return this.interestsService.getInterestsById(request);
    }
    getInterests(request) {
        return this.interestsService.getInterests(request);
    }
    addInterests(request) {
        return this.interestsService.addInterests(request);
    }
};
__decorate([
    (0, common_1.Post)('/get-ineterests-by-id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InterestsController.prototype, "getInterestsById", null);
__decorate([
    (0, common_1.Get)('/get-interests'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InterestsController.prototype, "getInterests", null);
__decorate([
    (0, common_1.Post)('/add-interest'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InterestsController.prototype, "addInterests", null);
InterestsController = __decorate([
    (0, common_1.Controller)('interests'),
    (0, swagger_1.ApiTags)('Интересы'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [interest_service_1.InterestsService])
], InterestsController);
exports.InterestsController = InterestsController;
//# sourceMappingURL=interest.controller.js.map