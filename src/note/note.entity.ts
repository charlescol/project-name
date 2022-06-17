import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "char", length:5})
  version: string;

  @Column({ type: "uuid" })
  author : string;

  @Column({ type: "varchar", length:20 })
  title : string;

  @Column({ type: "text" })
  content : string;

}