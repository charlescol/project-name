import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from "class-validator";

export class CreateNoteDto {
    constructor(date:string, title:string, content:string) {
        this.date = date;
        this.title = title;
        this.content = content;
    }
    @ApiProperty({type: String, description : 'Date of creation.', example:'2001-09-28', maxLength: 10, minLength:10, nullable: false})
    @IsString()
    @Length(10, 10)
    readonly date: string;
    @ApiProperty({description : 'The note title.', example:'My Title', maxLength: 20, nullable: false})
    @IsString()
    @Length(0, 20)
    readonly title : string;
    @ApiProperty({description : 'Content'})
    @IsString()
    readonly content : string;
}