import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(id: string, name:string, password : string) {
    this.id = id;
    this.username = name;
    this.password = password;
  }
  
  @ApiProperty({description : 'user id', example:'39aac101-334e-44c5-a173-09ca75d8613a', nullable: false})
  @PrimaryGeneratedColumn("uuid")
  id: string;

  
  @ApiProperty({description : 'username', example:'charlescol', nullable: false})
  @Column({ type: "varchar"})
  username: string;

  @ApiProperty({description : 'password', nullable: false})
  @Column({ type: "varchar"})
  password: string;

}