import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    constructor(date:string, version:string, author:string, title:string, content:string) {
        this.date = date;
        this.version = version;
        this.author = author;
        this.title = title;
        this.content = content;
    }
    @ApiProperty({description : 'Date of creation', example:'2001-09-28'})
    readonly date: string;
    @ApiProperty({description : 'Version of the object, 5 digits', example:'01.02'})
    readonly version: string;
    @ApiProperty({description : 'Author\'s UUID of the note', example:'39aac101-334e-44c5-a173-09ca75d8613a'})
    readonly author : string;
    @ApiProperty({description : 'Title, less than 20 characters'})
    readonly title : string;
    @ApiProperty({description : 'Content'})
    readonly content : string;
}