import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { MeetingComment } from "src/interfaces/meetingComment.interface";
export type MeetingDocument = Meeting & Document;

@Schema()

export class Meeting {     

    @ApiProperty({example: '1', description: 'Уникальный ид'})
    @Prop({ default: "meeting" + `${Math.floor(Math.random()*9999999)}`})
    meetingId: string;

    @ApiProperty({example: [ 'userId1', 'userId2'], description: 'Айди пользователей'})
    @Prop()
    participants: string[];

    @ApiProperty({example: '2023-10-10 13:45', description: 'Дата мероприятия'})
    @Prop({ default: new Date() })
    date: Date;

    @ApiProperty({example: 'Описание встречи', description: 'Описание встречи'})
    @Prop()
    description: string;
    
    @ApiProperty({example: 'Цель встречи', description: 'Цель встречи'})
    @Prop()
    goal: string;

    @ApiProperty({example: { userId: "userId", text: "text", date: "2023-10-11" }, description: 'Комментарии'})
    @Prop({ default: [] })
    comments: MeetingComment[];

    @ApiProperty({example: 'image1.png', description: 'Ссылка на картинку превью'})
    @Prop({ default: "no-preview.png" })
    preview: string;

    @ApiProperty({example: 'Название', description: 'Название встречи'})
    @Prop()
    title: string;

    @ApiProperty({example: 'Адрес', description: 'Адрес встречи'})
    @Prop()
    address: string;
}
export const MeetingSchema = SchemaFactory.createForClass(Meeting);