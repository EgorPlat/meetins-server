import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { IGroupPost } from "src/interfaces/groupPost.interface";
//import { IGroupPost, IGroupPostComment } from "src/interfaces/groupPost.interface";
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

}
export const GroupSchema = SchemaFactory.createForClass(Group);