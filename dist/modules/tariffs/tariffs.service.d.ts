import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppGateway } from 'src/app.gateway';
import { UserService } from 'src/modules/users/users.service';
import { Model } from 'mongoose';
import { Tariff, TariffsDocument } from 'src/schemas/tariffs.schema';
import { TariffOpportunities, TariffOpportunitiesDocument } from 'src/schemas/tariffsOpportunities.schema';
export declare class TariffsService {
    private jwtService;
    private userService;
    private socketServer;
    private tariffsModel;
    private tariffsOppotuinitiesModel;
    constructor(jwtService: JwtService, userService: UserService, socketServer: AppGateway, tariffsModel: Model<TariffsDocument>, tariffsOppotuinitiesModel: Model<TariffOpportunitiesDocument>);
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
