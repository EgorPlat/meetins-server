"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsModule = void 0;
const common_1 = require("@nestjs/common");
const groupsPosts_controller_1 = require("./groupsPosts.controller");
const auth_module_1 = require("../auth/auth.module");
const app_gateway_1 = require("../../app.gateway");
const token_module_1 = require("../../help/token.module");
const groupsPosts_service_1 = require("./groupsPosts.service");
const mongoose_1 = require("@nestjs/mongoose");
const groups_schema_1 = require("../../schemas/groups.schema");
const user_schema_1 = require("../../schemas/user.schema");
let GroupsModule = class GroupsModule {
};
GroupsModule = __decorate([
    (0, common_1.Module)({
        providers: [groupsPosts_service_1.GroupsService, app_gateway_1.AppGateway],
        controllers: [groupsPosts_controller_1.GroupsController],
        imports: [
            token_module_1.HelpJwtModule,
            mongoose_1.MongooseModule.forFeature([
                { name: groups_schema_1.Group.name, schema: groups_schema_1.GroupSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule)
        ],
    })
], GroupsModule);
exports.GroupsModule = GroupsModule;
//# sourceMappingURL=groupsPosts.module.js.map