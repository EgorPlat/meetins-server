"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const event_controller_1 = require("./event.controller");
const ckeck_service_1 = require("../../help/ckeck.service");
const token_module_1 = require("../../help/token.module");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
const mail_module_1 = require("../mail/mail.module");
const auth_module_1 = require("../auth/auth.module");
let EventModule = class EventModule {
};
EventModule = __decorate([
    (0, common_1.Module)({
        providers: [event_service_1.EventService, ckeck_service_1.CheckService, users_service_1.UserService],
        controllers: [event_controller_1.EventController],
        imports: [
            axios_1.HttpModule,
            token_module_1.HelpJwtModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mail_module_1.MailModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule)
        ],
    })
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map