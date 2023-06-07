import { Module } from '@nestjs/common';
import { InterestsService } from './interest.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AppGateway } from 'src/app.gateway';
import { HelpJwtModule } from 'src/help/token.module';
import { InterestsController } from './interest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interest, InterestSchema } from 'src/schemas/interests.schema';

@Module({
  providers: [InterestsService, AppGateway],
  controllers: [InterestsController],
  imports: [
    AuthModule,
    UsersModule,
    HelpJwtModule,
    MongooseModule.forFeature([
      { name: Interest.name, schema: InterestSchema },
    ]),
  ],
})
export class InterestsModule {}
