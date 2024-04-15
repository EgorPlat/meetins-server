import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { IInterests } from "src/interfaces/interests.interface";
import { IPost } from "src/interfaces/post.interface";
import { IOuterInvites, IInnerInvites } from "src/interfaces/sentInvites.interface";
import { IUserTag } from "src/interfaces/tag.interface";
export type UserDocument = User & Document;

@Schema()

export class User {                  
    @ApiProperty({example: '1', description: 'Уникальный ид'})
    @Prop()
    userId: string;

    @ApiProperty({example: false, description: 'Включены ли фильтры по интересам'})
    @Prop({default: false})
    isFilter: boolean;

    @ApiProperty({example: '[userId3534534]', description: 'Массив пользователей в закладках'})
    @Prop({default: []})
    markedUsers: string[];

    @ApiProperty({example: 'Имя', description: 'Имя пользователя'})
    @Prop()
    name: string;

    @ApiProperty({example: 'Строка', description: 'Статус пользователя'})
    @Prop({ default: 'Это мой новый статус!' })
    status: string;

    @ApiProperty({example: '89693469999', description: 'Телефон пользователя'})
    @Prop({ default: '' })
    phoneNumber: string;

    @ApiProperty({example: 'user@gmail.com', description: 'Email пользователя'})
    @Prop()
    email: string;

    @ApiProperty({example: 'sdfdf3r4341', description: 'Пароль'})
    @Prop({ default: 'password' })
    password: string;

    @ApiProperty({example: 'M', description: 'Пол пользователя'})
    @Prop()
    gender: string;

    @ApiProperty({example: 'Строка', description: 'URL картинки'})
    @Prop({ default: 'no-avatar.jpg' })
    avatar: string;

    @ApiProperty({example: '2022-03-25T13:40:13.192+00:00', description: 'Дата регистрации пользователя'})
    @Prop({ default: new Date() })
    dateRegister: Date;

    @ApiProperty({example: 'Строка', description: 'Статус пользователя'})
    @Prop({ default: Math.floor(Math.random()*10000) })
    login: number;

    @ApiProperty({example: '2022-03-25T13:40:13.192+00:00', description: 'Дата рождения пользователя'})
    @Prop({ default: new Date() })
    birthDate: Date;

    @ApiProperty({example: 'Строка', description: 'Город пользователя'})
    @Prop({ default: 'Секрет' })
    city: string;

    @ApiProperty({example: 'Число', description: 'Возраст пользователя'})
    @Prop({ default: 18 })
    age: number;

    @ApiProperty({example: [], description: 'Мероприятия'})
    @Prop({ default: [] })
    events: string[];
    
    @ApiProperty({example: [], description: 'Посты'})
    @Prop({ default: [] })
    posts: IPost[];

    @ApiProperty({example: [], description: 'Интересы'})
    @Prop({ default: [] })
    interests: IInterests[];

    @ApiProperty({example: [], description: 'Отправленные приглашения'})
    @Prop({ default: [] })
    outerInvites: IOuterInvites[];

    @ApiProperty({example: [], description: 'Входящие приглашения'})
    @Prop({ default: [] })
    innerInvites: IInnerInvites[];

    @ApiProperty({example: [1, 2], description: 'Купленные возможности'})
    @Prop({ default: [] })
    purchasedOpportunities: number[];

    @ApiProperty({example: { color: "blue", title: "User" }, description: 'Тэг'})
    @Prop({
        type: {},
        default: { color: "rgba(42, 132, 251, 0.878)", title: "Гость" } 
    })
    tag: IUserTag;
};

export const UserSchema = SchemaFactory.createForClass(User);