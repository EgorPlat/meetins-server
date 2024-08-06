import { Request } from 'express';
import { Model } from 'mongoose';
import { Tariff, TariffsDocument } from 'src/schemas/tariffs.schema';
import { TariffOpportunities, TariffOpportunitiesDocument } from 'src/schemas/tariffsOpportunities.schema';
export declare class TariffsService {
    private tariffsModel;
    private tariffsOppotuinitiesModel;
    constructor(tariffsModel: Model<TariffsDocument>, tariffsOppotuinitiesModel: Model<TariffOpportunitiesDocument>);
    addTariff(request: Request): Promise<Tariff & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    addTariffOppotunity(request: Request): Promise<TariffOpportunities & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getTariffsInfo(request: Request): Promise<{
        tariffId: number;
        title: string;
        price: number;
        periodMonth: number;
        opportunities: (TariffOpportunities & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
    }[]>;
}
