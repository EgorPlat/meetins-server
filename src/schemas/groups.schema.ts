import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { IGroupPost, IGroupTalk } from "src/interfaces/group.interface";
export type GroupsDocument = Group & Document;

@Schema()
export class Group {
    @ApiProperty({example: 1, description: 'Уникальный ид'})
    @Prop()
    groupId: number;

    @ApiProperty({example: 'Имя', description: 'Имя сообщества'})
    @Prop()
    name: string;

    @ApiProperty({example: 'Описание', description: 'Описание сообщества'})
    @Prop()
    description: string;

    @ApiProperty({example: 'Массив интересов', description: 'Массив интересов сообщества'})
    @Prop()
    interestsId: string[];

    @ApiProperty({example: 'mainAvatar1.png', description: 'Путь к файлу аватара для группы'})
    @Prop({ default: "no-avatar.jpg" })
    mainAvatar: string;

    @ApiProperty({example: 'headAvatar1.png', description: 'Путь к файлу аватара-шапки для группы'})
    @Prop({ default: null })
    headAvatar: string;

    @ApiProperty({example: ['id48932'], description: 'Массив айдишников участников'})
    @Prop()
    membersId: string[];

    @ApiProperty({example: 'id48932', description: 'Айди создателя'})
    @Prop()
    creatorId: string;

    @ApiProperty({example: [], description: 'Массив публикаций'})
    @Prop({ default: [] })
    posts: IGroupPost[];

    @ApiProperty({example: [], description: 'Массив обсуждений'})
    @Prop({ default: [] })
    talks: IGroupTalk[];

    @ApiProperty({example: [], description: 'Массив фото'})
    @Prop({ default: [] })
    photos: string[];

    @ApiProperty({example: [], description: 'Массив видео'})
    @Prop({ default: [] })
    video: string[];

    @ApiProperty({example: [], description: 'Массив вложений(файлов)'})
    @Prop({ default: [] })
    attachments: string[];
}
export const GroupSchema = SchemaFactory.createForClass(Group);