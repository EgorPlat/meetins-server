import { Module } from '@nestjs/common';
import { GroupsController } from './groupsPosts.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AppGateway } from 'src/app.gateway';
import { HelpJwtModule } from 'src/help/token.module';
import { GroupsService } from './groupsPosts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/schemas/groups.schema';

@Module({
  providers: [GroupsService, AppGateway],
  controllers: [GroupsController],
  imports: [
    AuthModule,
    HelpJwtModule,
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
})
export class GroupsModule {}
