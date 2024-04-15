import { Module, forwardRef } from '@nestjs/common';
import { GroupsController } from './groupsPosts.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AppGateway } from 'src/app.gateway';
import { HelpJwtModule } from 'src/help/token.module';
import { GroupsService } from './groupsPosts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/schemas/groups.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  providers: [GroupsService, AppGateway],
  controllers: [GroupsController],
  imports: [
    HelpJwtModule,
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => AuthModule)
  ],
})
export class GroupsModule {}
