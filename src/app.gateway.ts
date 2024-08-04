import { Injectable, UseGuards } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HelpJwtService } from './help/token.service';
import { Cron } from '@nestjs/schedule';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@Injectable()
@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  public activeUsersList: string[] = [];
  public activeFullUsersList: any[] = [];
  public clientsPeerId: any[] = [];

  constructor(private jwtHelpService: HelpJwtService) { }
  
  handleDisconnect(client: any) {
    const accessToken = client.handshake.headers.cookie
      ?.split('; ').find((cookie: string) => cookie.startsWith('access')).split('=')[1];
    const decodeToken = this.jwtHelpService.decodeJwtFromString(accessToken);

    this.activeUsersList = this.activeUsersList.filter(el => el !== decodeToken?.email);
    this.activeFullUsersList = this.activeFullUsersList.filter(el => el.email !== decodeToken?.email);
    this.clientsPeerId = this.clientsPeerId.filter(client => client.userId !== decodeToken?.userId);
  }
  
  @UseGuards(JwtAuthGuard)
  handleConnection(client: any, ...args: any[]) {
    const accessToken = client.handshake.headers.cookie
      ?.split('; ').find((cookie: string) => cookie.startsWith('access')).split('=')[1];
    const decodeToken = this.jwtHelpService.decodeJwtFromString(accessToken);

    this.activeUsersList = [...this.activeUsersList, decodeToken?.email];
    const fullClient = {
      email: decodeToken?.email,
      socketId: client.id,
      userId: decodeToken?.userId
    };
    this.activeFullUsersList = [...this.activeFullUsersList, fullClient];
  }

  @SubscribeMessage('send-peer-id')
  handleSendPeerId(@MessageBody() data: any): any {
    this.clientsPeerId = [...this.clientsPeerId, data];
  }

  @SubscribeMessage('get-peerID-for-call')
  handleGetPeerIdByUserId(@MessageBody() data: any): string {
    const { userId } = data;
    const peerID = this.clientsPeerId.filter(client => client.userId === userId)[0]?.peerID;
    if (peerID !== undefined) {
      return peerID;
    } else {
      return "";
    }
  }

  @Cron('5 * * * * *')
  handleUpdateUserList() {
    this.server.emit('updateUsers', { users: this.activeFullUsersList });
  }
}
