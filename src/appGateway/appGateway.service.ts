import { Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';

@Injectable()
export class AppGatewayService {

  constructor(
    private appGateway: AppGateway
  ) {}

  getAppGateway() {
    return this.appGateway;
  }

}
