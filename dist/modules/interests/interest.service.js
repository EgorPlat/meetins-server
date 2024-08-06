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
exports.InterestsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const interests_schema_1 = require("../../schemas/interests.schema");
const users_service_1 = require("../users/users.service");
const mongoose_2 = require("mongoose");
let InterestsService = class InterestsService {
    constructor(jwtService, userService, interestsModel) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.interestsModel = interestsModel;
    }
    async getInterests(request) {
        const allInterests = await this.interestsModel.find();
        if (allInterests) {
            return allInterests;
        }
        else {
            throw new common_1.HttpException('Ничего не найдено.', 400);
        }
    }
    async getInterestsById(request) {
        let findedInterests = [];
        const { interests } = request.body;
        if (interests) {
            await Promise.all(interests.map(async (el) => {
                const eachInterest = await this.interestsModel.findOne({ interestId: el });
                if (eachInterest) {
                    findedInterests = [...findedInterests, eachInterest];
                }
            }));
        }
        if (findedInterests) {
            return findedInterests;
        }
    }
    async addInterests(request) {
        const { title } = request.body;
        const newId = Math.floor(Math.random() * 500000);
        const newInterest = {
            title: title,
            interestId: newId
        };
        const interest = await this.interestsModel.create(newInterest);
        if (interest) {
            return interest;
        }
    }
};
InterestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(interests_schema_1.Interest.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UserService,
        mongoose_2.Model])
], InterestsService);
exports.InterestsService = InterestsService;
//# sourceMappingURL=interest.service.js.map