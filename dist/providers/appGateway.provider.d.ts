import { AppGateway } from '../app.gateway';
export declare class AppGatewayProvider {
    private readonly appGateway;
    constructor(appGateway: AppGateway);
    getGateway(): AppGateway;
}
