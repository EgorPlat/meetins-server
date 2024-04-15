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
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const token_service_1 = require("../../help/token.service");
const musicAuthor_schema_1 = require("../../schemas/musicAuthor.schema");
const mongoose_2 = require("mongoose");
let MusicService = class MusicService {
    constructor(jwtHelpService, musicAuthorModel) {
        this.jwtHelpService = jwtHelpService;
        this.musicAuthorModel = musicAuthorModel;
    }
    async getAllMusic() {
        const authors = await this.musicAuthorModel.find({});
        return authors;
    }
    ;
    async getAuthorsStatistics() {
        const authors = await this.musicAuthorModel.aggregate([
            {
                $unwind: "$compositions"
            },
            {
                $group: {
                    _id: "$authorId",
                    playsNumber: { $sum: "$compositions.playsNumber" },
                    name: { $first: "$name" }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    playsNumber: 1,
                    name: 1
                }
            }
        ]);
        return authors;
    }
    ;
    async addMusic(files, request) {
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const findedAuthor = await this.musicAuthorModel.findOne({ authorId: userId });
        let imageSrc = "";
        let audioSrc = "";
        files.map(file => {
            if (file.mimetype.includes('image'))
                imageSrc = file.filename;
            if (file.mimetype.includes('audio'))
                audioSrc = file.filename;
        });
        const newComposition = {
            audioSrc: audioSrc,
            imageSrc: imageSrc,
            title: request.body.title,
            description: request.body.description,
            playsNumber: 0,
            id: Math.floor(Math.random() * 1000000)
        };
        if (findedAuthor) {
            await this.musicAuthorModel.updateOne({ authorId: userId }, {
                $set: {
                    compositions: [...findedAuthor.compositions, newComposition]
                }
            });
        }
        else {
            await this.musicAuthorModel.create({
                authorId: userId,
                name: request.body.name,
                compositions: [newComposition]
            });
        }
    }
};
MusicService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(musicAuthor_schema_1.MusicAuthor.name)),
    __metadata("design:paramtypes", [token_service_1.HelpJwtService,
        mongoose_2.Model])
], MusicService);
exports.MusicService = MusicService;
//# sourceMappingURL=music.service.js.map