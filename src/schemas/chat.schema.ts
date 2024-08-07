import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { IMessage } from "src/interfaces/chatMessage.interface";
export type ChatDocument = Chat & Document;

@Schema()
export class Chat {                  
    @ApiProperty({example: '1', description: 'Уникальный ид'})
    @Prop()
    dialogId: string;

    @ApiProperty({example: [], description: 'Массив сообщений'})
    @Prop()
    messages: IMessage[];

    @ApiProperty({example: [], description: 'Массив пользователей userId'})
    @Prop()
    members: string[];
}
export const ChatSchema = SchemaFactory.createForClass(Chat);