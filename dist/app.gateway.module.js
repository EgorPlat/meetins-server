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
const app_gateway_1 = require("./app.gateway");
const token_module_1 = require("./help/token.module");
const jwt_1 = require("@nestjs/jwt");
let AppGatewayModule = class AppGatewayModule {
};
AppGatewayModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [token_module_1.HelpJwtModule, jwt_1.JwtModule],
        providers: [app_gateway_1.AppGateway],
        exports: [app_gateway_1.AppGateway],
    })
], AppGatewayModule);
exports.AppGatewayModule = AppGatewayModule;
//# sourceMappingURL=app.gateway.module.js.map