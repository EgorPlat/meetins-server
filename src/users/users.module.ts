import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}