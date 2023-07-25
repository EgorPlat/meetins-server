import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HelpJwtService } from './help/token.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  public activeUsersList: string[] = [];
  public activeFullUsersList: any[] = [];

  constructor(private jwtHelpService: HelpJwtService) { }
  
  handleDisconnect(client: any) {
    const accessToken = client.handshake.headers.cookie?.split('; ').find((cookie: string) => cookie.startsWith('access')).split('=')[1];
    const decodeToken = this.jwtHelpService.decodeJwtFromString(accessToken);
    this.activeUsersList = this.activeUsersList.filter(el => el !== decodeToken?.email);
    this.activeFullUsersList = this.activeFullUsersList.filter(el => el.email !== decodeToken?.email);
  }

  handleConnection(client: any, ...args: any[]) {
    const accessToken = client.handshake.headers.cookie?.split('; ').find((cookie: string) => cookie.startsWith('access')).split('=')[1];
    const decodeToken = this.jwtHelpService.decodeJwtFromString(accessToken);
    this.activeUsersList = [...this.activeUsersList, decodeToken?.email];
    const fullClient = {
      email: decodeToken?.email,
      socketId: client.id,
      userId: decodeToken?.userId
    };
    this.activeFullUsersList = [...this.activeFullUsersList, fullClient];
  }

  @Cron('45 * * * * *')
  handleUpdateUserList() {
    this.server.emit('updateUsers', { users: this.activeFullUsersList });
  }
}
