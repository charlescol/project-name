import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeleteResult, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './create-note.dto';
import { SharedBusinessErrors } from 'src/shared/shared.business-errors';
import { Validation } from './note.validator';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository : Repository<Note>
  ) {}

  async findAllAsync(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  create(createNoteDto : CreateNoteDto, userID:string) : Promise<Note>{
    if(createNoteDto.author != userID || !Validation.CreateDtoValidator.IsAcceptable(createNoteDto)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - Dto');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    const note = this.noteRepository.create(createNoteDto)
    return this.noteRepository.save(note);
  } 

  async findOneAsync(id: string, userID:string): Promise<Note> {
    if(!Validation.UUIDValidator.IsAcceptable(id)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - id');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    const note =  await this.noteRepository.createQueryBuilder().whereInIds(id).getOne();
    if(!note) throw new NotFoundException();
    if(note.author != userID) {
      Logger.error("Invalid Author ID");
      throw new NotAcceptableException();
    } 
    return note;
  }

  async removeAsync(id: string, userID:string): Promise<DeleteResult> {
    if(!Validation.UUIDValidator.IsAcceptable(id)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - id');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    await this.findOneAsync(id, userID);
    const result = await this.noteRepository.delete(id);
    if (!result.affected) throw new NotFoundException();
    return result;
  }
}



