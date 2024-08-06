"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestsModule = void 0;
const common_1 = require("@nestjs/common");
const interest_service_1 = require("./interest.service");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const token_module_1 = require("../../help/token.module");
const interest_controller_1 = require("./interest.controller");
const mongoose_1 = require("@nestjs/mongoose");
const interests_schema_1 = require("../../schemas/interests.schema");
let InterestsModule = class InterestsModule {
};
InterestsModule = __decorate([
    (0, common_1.Module)({
        providers: [interest_service_1.InterestsService],
        controllers: [interest_controller_1.InterestsController],
        imports: [
            users_module_1.UsersModule,
            token_module_1.HelpJwtModule,
            mongoose_1.MongooseModule.forFeature([
                { name: interests_schema_1.Interest.name, schema: interests_schema_1.InterestSchema },
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule)
        ],
    })
], InterestsModule);
exports.InterestsModule = InterestsModule;
//# sourceMappingURL=interest.module.js.map