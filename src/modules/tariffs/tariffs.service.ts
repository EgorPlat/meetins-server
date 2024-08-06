import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Tariff, TariffsDocument } from 'src/schemas/tariffs.schema';
import { TariffOpportunities, TariffOpportunitiesDocument } from 'src/schemas/tariffsOpportunities.schema';

@Injectable()
export class TariffsService {

    constructor(
        @InjectModel(Tariff.name) private tariffsModel: Model<TariffsDocument>,
        @InjectModel(TariffOpportunities.name) private tariffsOppotuinitiesModel: Model<TariffOpportunitiesDocument>
    ) {}

    async addTariff(request: Request) {
        const { title, tariffId, price, opportunities } = request.body;

        const newTariff = {
            tariffId,
            title,
            price,
            opportunities
        };
        const tariff = await this.tariffsModel.create(newTariff);
        if(tariff) { 
            return tariff;
        }
    }

    async addTariffOppotunity(request: Request) {
        const { title, description, opportunitesId } = request.body;

        const newTariffOppotunity = {
            opportunitesId,
            title,
            description
        };
        console.log(newTariffOppotunity)
        const tariffOppotunity = await this.tariffsOppotuinitiesModel.create(newTariffOppotunity);
        if(tariffOppotunity) { 
            return tariffOppotunity;
        }
    }

    async getTariffsInfo(request: Request) {
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
            }
        });

        return finalTariffsData;
    }
}
