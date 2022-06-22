import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm/typeorm.service';


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
