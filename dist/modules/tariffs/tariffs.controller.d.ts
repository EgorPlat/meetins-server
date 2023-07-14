/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { TariffsService } from './tariffs.service';
import { Request } from 'express';
export declare class TariffsController {
    private tariffsService;
    constructor(tariffsService: TariffsService);
    addTariff(request: Request): Promise<import("../../schemas/tariffs.schema").Tariff & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    addTariffOppotunity(request: Request): Promise<import("../../schemas/tariffsOpportunities.schema").TariffOpportunities & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getTariffsInfo(request: Request): Promise<{
        tariffId: number;
        title: string;
        price: number;
        periodMonth: number;
        opportunities: (import("../../schemas/tariffsOpportunities.schema").TariffOpportunities & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
    }[]>;
}
