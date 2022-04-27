"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const token_module_1 = require("../help/token.module");
const users_module_1 = require("../users/users.module");
const settings_controller_1 = require("./settings.controller");
const settings_service_1 = require("./settings.service");
let SettingsModule = class SettingsModule {
};
SettingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [settings_controller_1.SettingsController],
        providers: [settings_service_1.SettingsService],
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule, token_module_1.HelpJwtModule]
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map