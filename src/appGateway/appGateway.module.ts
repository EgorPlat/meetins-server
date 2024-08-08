import { Global, Module } from '@nestjs/common';
import { AppGatewayService } from './appGateway.service';
import { AppGateway } from 'src/app.gateway';
import { HelpJwtModule } from 'src/help/token.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Global()
@Module({
  providers: [AppGatewayService, AppGateway],
  exports: [AppGatewayService],
  imports: [HelpJwtModule, AuthModule]
})
export class AppGatewayModule {}