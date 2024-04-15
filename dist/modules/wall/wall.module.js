"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallModule = void 0;
const common_1 = require("@nestjs/common");
const wall_service_1 = require("./wall.service");
const wall_controller_1 = require("./wall.controller");
const token_module_1 = require("../../help/token.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const groups_schema_1 = require("../../schemas/groups.schema");
let WallModule = class WallModule {
};
WallModule = __decorate([
    (0, common_1.Module)({
        controllers: [wall_controller_1.WallController],
        providers: [wall_service_1.WallService],
        exports: [wall_service_1.WallService],
        imports: [token_module_1.HelpJwtModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: groups_schema_1.Group.name, schema: groups_schema_1.GroupSchema },
            ])
        ]
    })
], WallModule);
exports.WallModule = WallModule;
//# sourceMappingURL=wall.module.js.map