import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HelpJwtService } from './help/token.service';
export declare class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtHelpService;
    server: Server;
    activeUsersList: string[];
    activeFullUsersList: any[];
    constructor(jwtHelpService: HelpJwtService);
    handleDisconnect(client: any): void;
    handleConnection(client: any, ...args: any[]): void;
    handleMessage(client: any, payload: any): void;
}
