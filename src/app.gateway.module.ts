import { Module, Global } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { HelpJwtService } from './help/token.service';
import { HelpJwtModule } from './help/token.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [HelpJwtModule, JwtModule],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class AppGatewayModule {}