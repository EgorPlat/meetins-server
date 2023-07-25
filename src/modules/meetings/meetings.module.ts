import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AppGateway } from 'src/app.gateway';
import { HelpJwtModule } from 'src/help/token.module';
import { MeetingsService } from './meetings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingsController } from './meetings.controller';
import { Meeting, MeetingSchema } from 'src/schemas/meeting.schema';

@Module({
  providers: [MeetingsService, AppGateway],
  controllers: [MeetingsController],
  imports: [
    AuthModule,
    UsersModule,
    HelpJwtModule,
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
  ],
})
export class MeetingsModule {}
