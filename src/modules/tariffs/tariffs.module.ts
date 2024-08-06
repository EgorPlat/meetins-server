import { Module } from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { HelpJwtModule } from 'src/help/token.module';
import { TariffsController } from './tariffs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tariff, TariffSchema } from 'src/schemas/tariffs.schema';
import { TariffOpportunities, TariffOpportunitiesSchema } from 'src/schemas/tariffsOpportunities.schema';

@Module({
  providers: [TariffsService],
  controllers: [TariffsController],
  imports: [
    AuthModule,
    UsersModule,
    HelpJwtModule,
    MongooseModule.forFeature([
      { name: Tariff.name, schema: TariffSchema },
      { name: TariffOpportunities.name, schema: TariffOpportunitiesSchema },
    ]),
  ],
})
export class TariffsModule {}
