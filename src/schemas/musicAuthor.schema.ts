import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
export type MusicAuthorDocument = MusicAuthor & Document;

@Schema()
export class MusicAuthor {                  
    @ApiProperty({example: 1, description: 'Уникальный ид юзера'})
    @Prop()
    authorId: string;

    @ApiProperty({example: "Имя исполнителя", description: 'Имя исполнителя'})
    @Prop()
    name: string;

    @ApiProperty({example: [], description: 'Массив композиций автора'})
    @Prop()
    compositions: {
        id: number,
        audioSrc: string,
        imageSrc: string,
        title: string,
        description: string,
        playsNumber: number
    }[];
}
export const MusicAuthorSchema = SchemaFactory.createForClass(MusicAuthor);