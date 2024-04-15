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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const music_service_1 = require("./music.service");
const platform_express_1 = require("@nestjs/platform-express");
const fileSize_middleware_1 = require("../../middlewares/fileSize.middleware");
let MusicController = class MusicController {
    constructor(musicService) {
        this.musicService = musicService;
    }
    getAllMusic(request) {
        return this.musicService.getAllMusic();
    }
    getAuthorsStatistics(request) {
        return this.musicService.getAuthorsStatistics();
    }
    addMusic(files, request) {
        return this.musicService.addMusic(files, request);
    }
};
__decorate([
    (0, common_1.Get)('/getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "getAllMusic", null);
__decorate([
    (0, common_1.Get)('/statistic'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "getAuthorsStatistics", null);
__decorate([
    (0, common_1.Post)('/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('media', 2, fileSize_middleware_1.FinallMulterOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "addMusic", null);
MusicController = __decorate([
    (0, common_1.Controller)('music'),
    (0, swagger_1.ApiTags)('Музыка'),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
exports.MusicController = MusicController;
//# sourceMappingURL=music.controller.js.map