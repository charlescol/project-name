import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from "class-validator";

@Entity()
export class Note {
  constructor(id: string, date: string, version: string, author: string, title: string, content) {
    this.id = id;
    this.date = date;
    this.version = version;
    this.author = author;
    this.title = title;
    this.content = content;
  }

  @ApiProperty({description : 'The note\'s uuid.', example:'39aac101-334e-44c5-a173-09ca75d8613a', nullable: false})
  @IsUUID()
  @Column({ type: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ type: String, description: 'Date of creation.', example: '2001-09-28', maxLength: 10, minLength: 10, nullable: false })
  @IsString()
  @Length(10, 10)
  @Column({ type: "date" })
  date: string;

  @ApiProperty({description : 'Version of the object.', example:'01.02', maxLength: 5, minLength:5, nullable: false})
  @IsString()
  @Length(5, 5)
  @Column({ type: "char", length: 5 })
  version: string;

  @ApiProperty({description : 'The note author\'s uuid.', example:'39aac101-334e-44c5-a173-09ca75d8613a', nullable: false})
  @IsUUID()
  @Column({ type: "uuid" })
  author: string;

  @ApiProperty({description : 'The note title.', example:'My Title', maxLength: 20, nullable: false})
  @IsString()
  @Length(0, 20)
  @Column({ type: "varchar", length: 20 })
  title: string;

  @ApiProperty({description : 'Content'})
  @IsString()
  @Column({ type: "text" })
  content: string;

}