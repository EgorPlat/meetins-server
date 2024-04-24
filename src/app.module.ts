import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SettingsController } from './modules/settings/settings.controller';
import { SettingsService } from './modules/settings/settings.service';
import { SettingsModule } from './modules/settings/settings.module';
import { ChatModule } from './modules/chat/chat.module';
import { HelpJwtModule } from './help/token.module';
import { AppGateway } from './app.gateway';
import { EventModule } from './modules/event/event.module';
import { PostsModule } from './modules/posts/posts.module';
import { InterestsModule } from "./modules/interests/interest.module";
import { MailModule } from './modules/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TariffsModule } from "./modules/tariffs/tariffs.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { MeetingsModule } from "./modules/meetings/meetings.module";
import { GroupsModule } from "./modules/groups/groupsPosts.module";
import { MusicModule } from "./modules/music/music.module";
import { WallModule } from "./modules/wall/wall.module";
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController, SettingsController],
  providers: [AppService, SettingsService, AppGateway],
  imports: [
    HelpJwtModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.dbUrl),
    //MongooseModule.forRoot(dbUrl),
    ScheduleModule.forRoot(),
    AuthModule,
    ProfileModule,
    SettingsModule,
    ChatModule,
    EventModule,
    PostsModule,
    InterestsModule,
    MailModule,
    TariffsModule,
    PaymentModule,
    MeetingsModule,
    GroupsModule,
    MusicModule,
    WallModule
  ],
})
export class AppModule {

}