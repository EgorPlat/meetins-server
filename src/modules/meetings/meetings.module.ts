import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AppGateway } from 'src/app.gateway';
import { HelpJwtModule } from 'src/help/token.module';
import { MeetingsService } from './meetings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingsController } from './meetings.controller';
import { Meeting, MeetingSchema } from 'src/schemas/meeting.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  providers: [MeetingsService, AppGateway],
  controllers: [MeetingsController],
  imports: [
    UsersModule,
    HelpJwtModule,
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule)
  ],
})
export class MeetingsModule {}
