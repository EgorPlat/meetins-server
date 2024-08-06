"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateWayProviderModule = void 0;
const common_1 = require("@nestjs/common");
const appGateway_provider_1 = require("./appGateway.provider");
const app_gateway_1 = require("../app.gateway");
const token_module_1 = require("../help/token.module");
let AppGateWayProviderModule = class AppGateWayProviderModule {
};
AppGateWayProviderModule = __decorate([
    (0, common_1.Module)({
        providers: [appGateway_provider_1.AppGatewayProvider],
        imports: [
            app_gateway_1.AppGateway,
            token_module_1.HelpJwtModule
        ],
    })
], AppGateWayProviderModule);
exports.AppGateWayProviderModule = AppGateWayProviderModule;
//# sourceMappingURL=appGateway.module.js.map