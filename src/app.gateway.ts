import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HelpJwtService } from './help/token.service';

@Injectable()
@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  public activeUsersList: string[] = [];
  public activeFullUsersList: any[] = [];

  constructor(private jwtHelpService: HelpJwtService) { }

  handleDisconnect(client: any) {
    const decodeToken = this.jwtHelpService.decodeJwtFromString(client.handshake.headers.authorization);
    this.activeUsersList = this.activeUsersList.filter(el => el !== decodeToken?.email);
    this.activeFullUsersList = this.activeFullUsersList.filter(el => el.email !== decodeToken?.email);
    this.server.emit('updateUsers', { users: this.activeFullUsersList });
  }

  handleConnection(client: any, ...args: any[]) {
    const decodeToken = this.jwtHelpService.decodeJwtFromString(client.handshake.headers.authorization);
    this.activeUsersList = [...this.activeUsersList, decodeToken?.email];
    const fullClient = {
      email: decodeToken?.email,
      socketId: client.id,
      userId: decodeToken?.userId
    };
    this.activeFullUsersList = [...this.activeFullUsersList, fullClient];
    this.server.emit('updateUsers', { users: this.activeFullUsersList });
  }
}
