"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const appGateway_service_1 = require("./appGateway.service");
const app_gateway_1 = require("../app.gateway");
const token_module_1 = require("../help/token.module");
const auth_module_1 = require("../modules/auth/auth.module");
let AppGatewayModule = class AppGatewayModule {
};
AppGatewayModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [appGateway_service_1.AppGatewayService, app_gateway_1.AppGateway],
        exports: [appGateway_service_1.AppGatewayService],
        imports: [token_module_1.HelpJwtModule, auth_module_1.AuthModule]
    })
], AppGatewayModule);
exports.AppGatewayModule = AppGatewayModule;
//# sourceMappingURL=appGateway.module.js.map