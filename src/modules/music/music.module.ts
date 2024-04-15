import { Module, forwardRef } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { HelpJwtModule } from 'src/help/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicAuthor, MusicAuthorSchema } from 'src/schemas/musicAuthor.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MusicController],
  providers: [MusicService],
  exports: [MusicService], // 👈 export for DI,
  imports: [HelpJwtModule,
    MongooseModule.forFeature([
      { name: MusicAuthor.name, schema: MusicAuthorSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => AuthModule)
  ]
})
export class MusicModule {}