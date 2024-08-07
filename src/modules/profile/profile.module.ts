import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { HelpJwtModule } from 'src/help/token.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [UsersModule, HelpJwtModule, forwardRef(() => AuthModule)]
})
export class ProfileModule {}