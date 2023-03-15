import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { CheckService } from 'src/help/ckeck.service';
import { HelpJwtModule } from 'src/help/token.module';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/users/users.service';

@Module({
  providers: [EventService, CheckService, UserService],
  controllers: [EventController],
  imports: [
    HttpModule,
    HelpJwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class EventModule {}
