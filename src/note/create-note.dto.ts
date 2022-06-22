import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from "class-validator";

export class CreateNoteDto {
    constructor(date:string, version:string, author:string, title:string, content:string) {
        this.date = date;
        this.version = version;
        this.author = author;
        this.title = title;
        this.content = content;
    }
    @ApiProperty({type: String, description : 'Date of creation.', example:'2001-09-28', maxLength: 10, minLength:10, nullable: false})
    @IsString()
    @Length(10, 10)
    readonly date: string;
    @ApiProperty({description : 'Version of the object.', example:'01.02', maxLength: 5, minLength:5, nullable: false})
    @IsString()
    @Length(5, 5)
    readonly version: string;
    @ApiProperty({description : 'The note author\'s uuid.', example:'39aac101-334e-44c5-a173-09ca75d8613a', nullable: false})
    @IsUUID()
    readonly author : string;
    @ApiProperty({description : 'The note title.', example:'My Title', maxLength: 20, nullable: false})
    @IsString()
    @Length(0, 20)
    readonly title : string;
    @ApiProperty({description : 'Content'})
    @IsString()
    readonly content : string;
}