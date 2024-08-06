"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TariffsModule = void 0;
const common_1 = require("@nestjs/common");
const tariffs_service_1 = require("./tariffs.service");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const token_module_1 = require("../../help/token.module");
const tariffs_controller_1 = require("./tariffs.controller");
const mongoose_1 = require("@nestjs/mongoose");
const tariffs_schema_1 = require("../../schemas/tariffs.schema");
const tariffsOpportunities_schema_1 = require("../../schemas/tariffsOpportunities.schema");
let TariffsModule = class TariffsModule {
};
TariffsModule = __decorate([
    (0, common_1.Module)({
        providers: [tariffs_service_1.TariffsService],
        controllers: [tariffs_controller_1.TariffsController],
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            token_module_1.HelpJwtModule,
            mongoose_1.MongooseModule.forFeature([
                { name: tariffs_schema_1.Tariff.name, schema: tariffs_schema_1.TariffSchema },
                { name: tariffsOpportunities_schema_1.TariffOpportunities.name, schema: tariffsOpportunities_schema_1.TariffOpportunitiesSchema },
            ]),
        ],
    })
], TariffsModule);
exports.TariffsModule = TariffsModule;
//# sourceMappingURL=tariffs.module.js.map