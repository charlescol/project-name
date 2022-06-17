import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Note } from './note/note.entity';
import { NoteModule } from './note/note.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NoteModule, AuthModule, UsersModule,ConfigModule.forRoot({isGlobal: true,}), TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432, 
    username: 'postgres',
    database: 'Notepad',
    password: 'docker',
    entities: [User, Note],
    synchronize: true,
  })],
  controllers: [AppController]
})
export class AppModule { }
