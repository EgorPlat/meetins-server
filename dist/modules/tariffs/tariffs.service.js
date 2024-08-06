"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TariffsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tariffs_schema_1 = require("../../schemas/tariffs.schema");
const tariffsOpportunities_schema_1 = require("../../schemas/tariffsOpportunities.schema");
let TariffsService = class TariffsService {
    constructor(tariffsModel, tariffsOppotuinitiesModel) {
        this.tariffsModel = tariffsModel;
        this.tariffsOppotuinitiesModel = tariffsOppotuinitiesModel;
    }
    async addTariff(request) {
        const { title, tariffId, price, opportunities } = request.body;
        const newTariff = {
            tariffId,
            title,
            price,
            opportunities
        };
        const tariff = await this.tariffsModel.create(newTariff);
        if (tariff) {
            return tariff;
        }
    }
    async addTariffOppotunity(request) {
        const { title, description, opportunitesId } = request.body;
        const newTariffOppotunity = {
            opportunitesId,
            title,
            description
        };
        console.log(newTariffOppotunity);
        const tariffOppotunity = await this.tariffsOppotuinitiesModel.create(newTariffOppotunity);
        if (tariffOppotunity) {
            return tariffOppotunity;
        }
    }
    async getTariffsInfo(request) {
        const tariffs = await this.tariffsModel.find({}, {
            _id: false,
            __v: false
        });
        const tariffsOppotunities = await this.tariffsOppotuinitiesModel.find({}, {
            _id: false,
            __v: false
        });
        const finalTariffsData = tariffs.map(currentTariff => {
            const tariffOppotunities = currentTariff.opportunities.map(oppotunity => {
                return tariffsOppotunities[oppotunity - 1];
            });
            return {
                tariffId: currentTariff.tariffId,
                title: currentTariff.title,
                price: currentTariff.price,
                periodMonth: currentTariff.periodMonth,
                opportunities: tariffOppotunities
            };
        });
        return finalTariffsData;
    }
};
TariffsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tariffs_schema_1.Tariff.name)),
    __param(1, (0, mongoose_1.InjectModel)(tariffsOpportunities_schema_1.TariffOpportunities.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TariffsService);
exports.TariffsService = TariffsService;
//# sourceMappingURL=tariffs.service.js.map