import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Note } from './note/note.entity';
import { NoteModule } from './note/note.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm/typeorm.service';

const fs = require('fs');

@Module({
  imports: [NoteModule, AuthModule, UsersModule,
    ConfigModule.forRoot({
        envFilePath: './src/.development.env',
        isGlobal : true,
  }), 
  TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  controllers: [AppController]
})
export class AppModule { }
