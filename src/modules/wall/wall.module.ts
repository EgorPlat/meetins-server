import { Module } from '@nestjs/common';
import { WallService } from './wall.service';
import { WallController } from './wall.controller';
import { HelpJwtModule } from 'src/help/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Group, GroupSchema } from 'src/schemas/groups.schema';

@Module({
  controllers: [WallController],
  providers: [WallService],
  exports: [WallService], // 👈 export for DI,
  imports: [HelpJwtModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Group.name, schema: GroupSchema },
    ])
  ]
})
export class WallModule {}