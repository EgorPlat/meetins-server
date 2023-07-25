"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const app_gateway_1 = require("../../app.gateway");
const token_module_1 = require("../../help/token.module");
const meetings_service_1 = require("./meetings.service");
const mongoose_1 = require("@nestjs/mongoose");
const meetings_controller_1 = require("./meetings.controller");
const meeting_schema_1 = require("../../schemas/meeting.schema");
let MeetingsModule = class MeetingsModule {
};
MeetingsModule = __decorate([
    (0, common_1.Module)({
        providers: [meetings_service_1.MeetingsService, app_gateway_1.AppGateway],
        controllers: [meetings_controller_1.MeetingsController],
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            token_module_1.HelpJwtModule,
            mongoose_1.MongooseModule.forFeature([{ name: meeting_schema_1.Meeting.name, schema: meeting_schema_1.MeetingSchema }]),
        ],
    })
], MeetingsModule);
exports.MeetingsModule = MeetingsModule;
//# sourceMappingURL=meetings.module.js.map