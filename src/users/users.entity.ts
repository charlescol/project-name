import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(id: string, name:string, password : string) {
    this.id = id;
    this.username = name;
    this.password = password;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar"})
  password: string;

}