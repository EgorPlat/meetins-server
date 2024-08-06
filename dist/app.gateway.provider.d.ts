import { AppGateway } from './app.gateway';
export declare class AppGatewayProvider {
    private readonly appGateway;
    constructor();
    getGateway(): AppGateway;
}
