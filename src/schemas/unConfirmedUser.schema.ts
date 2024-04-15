import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
export type UnConfirmedUserDocument = UnConfirmedUser & Document;

@Schema()
export class UnConfirmedUser {                  

    @ApiProperty({example: 'Имя', description: 'Имя пользователя'})
    @Prop()
    name: string;

    @ApiProperty({example: 'user@gmail.com', description: 'Email пользователя'})
    @Prop()
    email: string;

    @ApiProperty({example: 'sdfdf3r4341', description: 'Пароль'})
    @Prop({ default: 'password' })
    password: string;

    @ApiProperty({example: 'M', description: 'Пол пользователя'})
    @Prop()
    gender: string;

    @ApiProperty({example: 'Строка', description: 'Город пользователя'})
    @Prop({ default: 'Секрет' })
    city: string;

    @ApiProperty({example: 'Строка', description: 'Актуальный код для подтверждения'})
    @Prop({ default: 'Секрет' })
    actualCodeForConfirmation: number;
};

export const UnConfirmedUserSchema = SchemaFactory.createForClass(UnConfirmedUser);