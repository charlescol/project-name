import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';
import { NoteController } from './note.controller';
import { Note } from './note.entity';
import { NoteService } from './note.service';

/* Note Module : allows a logged in user to interact with their notes */

@Module({
    imports:[TypeOrmModule.forFeature([Note]), AuthModule],
    controllers: [NoteController],
    providers : [NoteService]
})
export class NoteModule {}
